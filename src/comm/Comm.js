// Comm interface

// Subclasses must provide a pubsub interface of a single channel.

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

  addPing(other, value) {
    this._ping[other] = value;
  }

  subscribe(messages, callback) {
    this._subs.push({callback: callback, messages: messages});
  }

  _receive(payload) {
    if (payload.id == this.id) return;
    for (const s of this._subs) {
      if (s.messages == "*") {
        s.callback(payload.id || 0, payload);
      } else if (s.messages in payload) {
        s.callback(payload.id || 0, payload[s.messages]);
      }
    }
  }

  publish(payload) {
    if (this.id) payload.id = this.id;
    console.log(this.id + ":", payload);
    this._publish(payload);
  }
}
