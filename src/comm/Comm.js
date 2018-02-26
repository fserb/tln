// Comm interface

// Subclasses must provide a pubsub interface of a single channel.

import C from "../Consts.js";
import proto from "../Message_pb.js";

export default class Comm {
  constructor() {
    this._subs = [];
    this.id = 0;
    this.done = new Promise((res, _rej) => res());
    this._timeDrift = 0.0;
    this._ping = {};
    this._localIdCount = 1;
  }

  // returns current time in seconds (high precision), adjusted to
  // sync with current network.
  time() {
    return this._timeDrift + (window.performance.now() / 1000);
  }

  // Generate a new id that is unique globally.
  genNewID() {
    return ((this._localIdCount++) << C.ID_BITS) | this.id;
  }

  addTimeDrift(d) {
    this._timeDrift += d;
  }

  // returns adjusted ping from here to @other.
  ping(other) {
    return this._ping[other] || 0;
  }

  setPing(other, value) {
    this._ping[other] = value;
  }

  subscribe(callback) {
    this._subs.push(callback);
  }

  _receive(payload) {
    const msg = proto.Message.decode(payload);
    if (this.id != 0 && msg.id == this.id) return;
    for (const cb of this._subs) {
      cb(msg);
    }
  }

  publish(payload) {
    if (this.id) payload.id = this.id;
    console.log(this.id + ":", proto.Message.toObject(payload));
    this._publish(proto.Message.encode(payload).finish());
  }
}
