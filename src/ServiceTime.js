
// import C from "./Consts.js";

export default class ServiceTime {
  constructor(tln) {
    this._tln = tln;
    this._tln.comm.subscribe("time", this.receiveTime.bind(this));

    this.peers = {};
    this.pending = [];
  }

  realTime() {
    return window.performance.now() / 1000;
  }

  adjustTime() {
    let adj = 0.0;
    let cnt = 0;

    for (const p in this.peers) {
      const pl = this.peers[p];
      if (pl.length < 20) continue;
      pl.splice(0, pl.length - 20);
      const c = pl.slice();
      c.sort((a, b) => a.ping - b.ping);
      c.splice(0, c.length - 5);
      const avg = c.reduce((acc, v) => acc + v.delta, 0) / c.length;
      adj += avg;
      cnt++;
    }

    if (cnt > 0) {
      const d = (adj / cnt);
      for (const p in this.peers) {
        if (this.peers[p].length == 0) continue;
        let ping = 0.0;
        for (let i = 0; i < this.peers[p].length; ++i) {
          this.peers[p][i].delta -= d;
          ping += this.peers[p][i].ping;
        }
        this._tln.comm.addPing(p, ping / this.peers[p].length);
      }

      this._tln.comm.addTimeDrift(d / 2.0);
    }
  }

  appendTime(payload) {
    const real = this.realTime();
    const pt = { now: this._tln.comm.time(), real: real, res: {} };

    for (const p of this.pending) {
      pt.res[p.from] = { orig: p.orig, delay: real - p.received };
    }
    this.pending.length = 0;

    payload["time"] = pt;
    return payload;
  }

  receiveTime(pid, payload) {
    const now = this._tln.comm.time();
    const real = this.realTime();
    this.pending.push({from: pid, orig: payload["real"], received: real});

    if ('res' in payload && this._tln.comm.id in payload.res) {
      const res = payload["res"][this._tln.comm.id];

      if (!(pid in this.peers)) this.peers[pid] = [];

      const ping = real - res.orig - res.delay;
      const remote = payload["now"] + (ping / 2.0);

      this.peers[pid].push({ ping: ping, delta: remote - now });
      this.adjustTime();
    }
  }
}
