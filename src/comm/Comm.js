// Comm interface

// Subclasses must provide a pubsub interface of a single channel.

export default class Comm {
  constructor() {
  }

  // returns current time in seconds (high precision), adjusted to
  // sync with current network.
  time() {
    return window.performance.now() / 1000;
  }

  // returns adjusted ping from here to @other.
  ping(_other) {
  }

  subscribe(callback) {
    this._subscribe(callback);
  }

  publish(payload) {
    this._publish(payload);
  }
}
