import Comm from "./Comm.js";

const pubsub = [];

function delay(avg) {
  return Math.max(0, avg * (0.9 + 0.2 * Math.random()));
}

export default class CommLocal extends Comm {
  constructor(lag) {
    super();
    this.lag = lag;
  }

  _subscribe(callback) {
    pubsub.push(
      (value, d2) => {
        setTimeout(callback.bind(this, value), delay((d2 + this.lag) / 2.0));
      }
    );
  }

  _publish(packet) {
    for (const f of pubsub) {
      f(JSON.parse(JSON.stringify(packet)), this.lag);
    }
  }

  _resetForTesting() {
    pubsub.length = 0;
  }
}
