// timeline

let TIMESTATE_ID = 1;
let TIMELINE_ID = 1;

export default class TimeObject {
  constructor(floatFields, valueFields, ids = []) {
    this._timeFields = {};
    this._host = 0;
    for (let f of floatFields) {
      this._timeFields[f] = new Timeline(Timeline.FLOAT, ids.shift());
      this._timeFields[f].obj = this;
      this[f] = 0.0;
    }
    for (let f of valueFields) {
      this._timeFields[f] = new Timeline(Timeline.VALUE, ids.shift());
      this._timeFields[f].obj = this;
      this[f] = null;
    }
  }

  store(time = 0.0, prio=Timeline.SCRATCH) {
    for (let f in this._timeFields) {
      this._timeFields[f].set(time, this[f], prio);
    }
  }

  load(time = 0.0) {
    for (let f in this._timeFields) {
      this[f] = this._timeFields[f].get(time);
    }
  }
}
