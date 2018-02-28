// timeline

import Timeline from "./Timeline.js";

export default class TimeObject {
  constructor(target, floatFields, valueFields, ids = []) {
    this.timeFields = {};
    this.target = target;

    for (const f of floatFields) {
      this.timeFields[f] = new Timeline(Timeline.FLOAT, ids.shift());
      this.timeFields[f].obj = this;
      this[f] = 0.0;
    }
    for (const f of valueFields) {
      this.timeFields[f] = new Timeline(Timeline.VALUE, ids.shift());
      this.timeFields[f].obj = this;
      this[f] = null;
    }
  }

  store(time = 0.0, prio = Timeline.SCRATCH) {
    for (const f in this.timeFields) {
      this.timeFields[f].set(time, this[f], prio);
    }
  }

  load(time = 0.0) {
    for (const f in this.timeFields) {
      this[f] = this.timeFields[f].get(time);
    }
  }
}
