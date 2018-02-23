// Comm interface

// Subclasses must provide a pubsub interface of a single channel.

export default class Comm {
  constructor() {
    this._subs = [];
    this.id = 0;
    this.done = new Promise((res, _rej) => res());
  }

  // returns current time in seconds (high precision), adjusted to
  // sync with current network.
  time() {
    return window.performance.now() / 1000;
  }

  // returns adjusted ping from here to @other.
  ping(_other) {
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
    console.log(this.id + ":", payload);
    this._publish(payload);
  }
}
