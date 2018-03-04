
import Timeline from "./Timeline.js";

export default class TimeObject {
  constructor(target, floatFields, valueFields) {
    this.timeFields = [];
    this.target = target;
    this.host = false;
    this.target['_timeObject'] = this;

    for (const f of floatFields) {
      const tf = new Timeline(Timeline.FLOAT, 0);
      tf["_name"] = f;
      this.timeFields.push(tf);
    }
    for (const f of valueFields) {
      const tf = new Timeline(Timeline.VALUE, 0);
      tf["_name"] = f;
      this.timeFields.push(tf);
    }
  }

  setIDs(ids) {
    for (const tf of this.timeFields) {
      tf.id = ids.shift();
    }
  }

  makeHosted(tln) {
    const ret = [];
    this.host = true;
    for (const tf of this.timeFields) {
      const i = tln.comm.getNewID();
      tf.id = i;
      ret.push(i);
    }
    return ret;
  }

  store(time = 0.0, prio = Timeline.SCRATCH) {
    for (const tf of this.timeFields) {
      tf.set(time, this.target[tf['_name']], prio);
    }
  }

  load(time = 0.0) {
    for (const tf of this.timeFields) {
      this.target[tf['_name']] = tf.get(time);
    }
  }
}
