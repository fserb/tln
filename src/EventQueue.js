import proto from "./Message_pb.js";

export default class EventQueue {
  constructor() {
    this._events = [];
    this._added = [];
  }

  addEvent(time, action, args, ids) {
    let i = 0;
    while (i < this._events.length && this._events[i].time < time) i++;
    const obj = {time: time, action: action, args: args, ids: ids};
    this._events.splice(i, 0, obj);
    this._added.push(obj);
  }

  // pop all events up to (and including) that time.
  popEvents(time) {
    let i = 0;
    while (i < this._events.length && this._events[i].time <= time) i++;
    return this._events.splice(0, i);
  }

  sync(now) {
    const ret = [];

    for (const o of this._added) {
      const ev = new proto.Event();
      ev.time = o.time - now;
      ev.action = o.action;
      ev.args = JSON.stringify(o.args);
      ev.ids = o.ids;
      ret.push(ev);
    }

    this._added.length = 0;
    return ret;
  }

  update(pack) {
    const bk = this._added;
    this._added = [];
    for (const o of pack) {
      this.addEvent(o.time, o.action, JSON.parse(o.args) || [], o.ids);
    }
    this._added = bk;
  }
}
