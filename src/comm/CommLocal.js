import Comm from "./Comm.js";

const pubsub = [];

function delay(avg) {
  return Math.max(0, avg * (0.9 + 0.2 * Math.random()));
}

export default class CommLocal extends Comm {
  constructor(lag) {
    super();
    this.lag = lag;
    this.bytes = 0;

    pubsub.push(
      (value, d2) => {
        const l = (d2 + this.lag) / 2.0;
        setTimeout(this._receive.bind(this, value), delay(l));
      });
    this.done = new Promise((res, _rej) => res());
  }

  _publish(packet) {
    this.bytes += packet.length;
    for (const f of pubsub) {
      f(new Uint8Array(packet), this.lag);
    }
  }

  _resetForTesting() {
    pubsub.length = 0;
  }
}
