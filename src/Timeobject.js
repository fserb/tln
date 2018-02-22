// timeline

import Timeline from "./Timeline.js";

export default class TimeObject {
  constructor(floatFields, valueFields, ids = []) {
    this._timeFields = {};
    this._host = 0;
    for (const f of floatFields) {
      this._timeFields[f] = new Timeline(Timeline.FLOAT, ids.shift());
      this._timeFields[f].obj = this;
      this[f] = 0.0;
    }
    for (const f of valueFields) {
      this._timeFields[f] = new Timeline(Timeline.VALUE, ids.shift());
      this._timeFields[f].obj = this;
      this[f] = null;
    }
  }

  store(time = 0.0, prio = Timeline.SCRATCH) {
    for (const f in this._timeFields) {
      this._timeFields[f].set(time, this[f], prio);
    }
  }

  load(time = 0.0) {
    for (const f in this._timeFields) {
      this[f] = this._timeFields[f].get(time);
    }
  }
}
