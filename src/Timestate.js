// Timestate

import {server, SERVERB} from "./Server.js";
import Timeline from "./Timeline.js";

let TIMESTATE_ID = 1;
const MASTER_DELAY = 0.2;
const LAG_COMPENSATION = 1.0;
const SYNC_TIME = 1.0 / 10.0;

export default class Timestate {
  constructor() {
    this.id = TIMESTATE_ID++;
    this.state = {};
    this.hostState = {};
    this.objects = [];
    this.lastSync = {};
    this.syncTime = 0;
    this.now = 0;
    this.master = false;

    server.subscribe("sync", this.id, this.update.bind(this));
  }

  getDelay(obj) {
    if (this.master) return -MASTER_DELAY;
    if (obj._host == this.id) return 0;

    return -(SERVERB[this.id] + SERVERB[obj._host]) * LAG_COMPENSATION / 1000;
  }

  load(dt) {
    for (const o of this.objects) {
      o.load(this.getDelay(o) - dt);
    }
  }

  store(prio = Timeline.SCRATCH) {
    for (const o of this.objects) {
      o.store(this.getDelay(o), prio);
    }
  }

  add(obj) {
    this.objects.push(obj);
    for (const f in obj._timeFields) {
      const t = obj._timeFields[f];
      this.state[t.id] = t;
    }
  }

  addHost(obj) {
    obj._host = this.id;
    this.objects.push(obj);
    for (const f in obj._timeFields) {
      const t = obj._timeFields[f];
      this.state[t.id] = t;
      this.hostState[t.id] = t;
    }
  }

  sync(dt) {
    this.now = server.time();
    for (const k in this.state) {
      this.state[k].now = this.now;
    }

    this.syncTime -= dt;
    if (this.syncTime > 0) return;
    this.syncTime += SYNC_TIME;

    const pack = {id: this.id, time: server.time() };

    if (this.master) {
      for (const k in this.state) {
        const v = this.state[k].masterSync(MASTER_DELAY);
        if (v.length) pack[k] = v;
      }
    } else {
      for (const k in this.hostState) {
        pack[k] = this.state[k].hostSync();
      }
    }

    server.publish("sync", this.id, pack);
  }

  update(val) {
    if (val.id == this.id) return;
    this.lastSync[val.id] = val.time;
    const delta = this.now - val.time;
    for (const k in val) {
      if (!this.state[k]) continue;
      for (const o of val[k]) {
        o[0] -= delta;
      }
      // if (this.hostState[k]) debugger;
      this.state[k].update(val[k]);
    }
  }
}
