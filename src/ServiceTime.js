
// import C from "./Consts.js";
import proto from "./Message_pb.js";

export default class ServiceTime {
  constructor(tln) {
    this._tln = tln;
    this._tln.comm.subscribe(this.receiveTime.bind(this));

    this.peers = {};
    this.pending = [];
  }

  realTime() {
    return window.performance.now() / 1000;
  }

  adjustTime() {
    let adj = 0.0;
    let cnt = 0;

    // Calculate the average time difference.
    for (const p in this.peers) {
      const pl = this.peers[p];
      if (pl.length < 5) continue;
      pl.splice(0, pl.length - 20);
      const c = pl.slice();
      c.sort((a, b) => a.ping - b.ping);
      c.splice(0, c.length - 5);
      const avg = c.reduce((acc, v) => acc + v.delta, 0) / c.length;
      adj += avg;
      cnt++;
    }

    if (cnt > 0) {
      // We move our peer numbers by the distance, but only
      // drift half of that. The reason is: that the other half is
      // going to be done by our peers.
      const d = (adj / cnt);
      for (const p in this.peers) {
        if (this.peers[p].length == 0) continue;
        let ping = 0.0;
        for (let i = 0; i < this.peers[p].length; ++i) {
          this.peers[p][i].delta -= d;
          ping += this.peers[p][i].ping;
        }
        this._tln.comm.setPing(p, ping / this.peers[p].length);
      }

      this._tln.comm.addTimeDrift(d / 2.0);
    }
  }

  appendTime(msg) {
    const real = this.realTime();
    const st = new proto.ServiceTime();
    msg.setServiceTime(st);
    st.setNow(this._tln.comm.time());
    st.setReal(real);

    for (const p of this.pending) {
      const r = new proto.ServiceTime.Response();
      r.setFrom(p.from);
      r.setOrigin(p.orig);
      r.setDelay(real - p.received);
      st.addResponse(r);
    }
    this.pending.length = 0;

    return msg;
  }

  receiveTime(msg) {
    if (!msg.hasServiceTime()) return;
    const st = msg.getServiceTime();
    const now = this._tln.comm.time();
    const real = this.realTime();
    const pid = msg.getId();
    this.pending.push({from: pid, orig: st.getReal(), received: real});

    const rl = st.getResponseList();
    for (let i = 0; i < rl.length; ++i) {
      if (rl[i].getFrom() != this._tln.comm.id) continue;
      const res = rl[i];

      if (!(pid in this.peers)) this.peers[pid] = [];

      const ping = real - res.getOrigin() - res.getDelay();
      const remote = st.getNow() + (ping / 2.0);

      this.peers[pid].push({ ping: ping, delta: remote - now });
      this.adjustTime();

      break;
    }
  }
}
