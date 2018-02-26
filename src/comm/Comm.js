// Comm interface

// Subclasses must provide a pubsub interface of a single channel.

import proto from "../Message_pb.js";

export default class Comm {
  constructor() {
    this._subs = [];
    this.id = 0;
    this.done = new Promise((res, _rej) => res());
    this._timeDrift = 0.0;
    this._ping = {};
  }

  // returns current time in seconds (high precision), adjusted to
  // sync with current network.
  time() {
    return this._timeDrift + (window.performance.now() / 1000);
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
    const msg = proto.Message.deserializeBinary(payload);
    if (this.id != 0 && msg.getId() == this.id) return;
    for (const cb of this._subs) {
      cb(msg);
    }
  }

  publish(payload) {
    if (!(payload instanceof proto.Message)) throw "only publish proto.Message";
    if (this.id) payload.setId(this.id);
    console.log(this.id + ":", payload.toObject());
    this._publish(payload.serializeBinary());
  }
}
