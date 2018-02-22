// Timeline.js

let TIMELINE_ID = 1;

export default class Timeline extends Function {
  constructor(interpolation, id) {
    super();
    this.interp = interpolation || Timeline.VALUE;
    if (this.interp != Timeline.VALUE && this.interp != Timeline.FLOAT) {
      throw "Invalid interp: " + interpolation;
    }
    this.id = id || (TIMELINE_ID++);
    this.frames = [];
    this.now = 0;
    this.obj = null;

    return new Proxy(this, {
      apply: function(target, self, args) {
        return target.get.apply(target, args);
      }});
  }

  gc() {
    const tf = this._getFrames(Timeline.MASTER);
    if (tf.length >= 5) {
      const mark = tf[tf.length - 5];
      this._removeFrames({mintime: mark.time});
    }
  }

  masterSync(mdelay) {
    if (!this.frames.length) return [];
    const cutoff = this.now - mdelay;

    this.gc();

    if (this.interp == Timeline.FLOAT) {
      const scratch = this._getFrames(Timeline.SCRATCH);
      if (scratch.length) {
        let last = null;
        for (let i = 0; i < scratch.length; ++i) {
          if (scratch[i].time > cutoff) break;
          last = scratch[i];
        }
        if (last !== null) {
          this.set(last.time - this.now, last.value, Timeline.MASTER);
          return [[last.time - this.now, last.value, Timeline.MASTER]];
        }
      }
      return [];
    } else if (this.interp == Timeline.VALUE) {
      const scratch = this._getFrames(Timeline.SCRATCH);
      const ret = [];
      for (let i = 0; i < scratch.length; ++i) {
        if (scratch[i].time > cutoff) break;
        scratch[i].prio = Timeline.MASTER;
        ret.push(
          [scratch[i].time - this.now, scratch[i].value, Timeline.MASTER]);
      }
      return ret;
    }
  }

  hostSync() {
    if (!this.frames.length) return [];

    this.gc();

    if (this.interp == Timeline.FLOAT) {
      const scratch = this._getFrames(Timeline.SCRATCH);
      if (scratch.length) {
        const last = scratch[scratch.length - 1];
        this.set(last.time - this.now, last.value, Timeline.HOST);
        return [[last.time - this.now, last.value, Timeline.HOST]];
      }
      return [];
    } else if (this.interp == Timeline.VALUE) {
      const scratch = this._getFrames(Timeline.SCRATCH);
      const ret = [];
      for (let i = 0; i < scratch.length; ++i) {
        scratch[i].prio = Timeline.HOST;
        ret.push([scratch[i].time - this.now, scratch[i].value, Timeline.HOST]);
      }
      return ret;
    }
  }

  dump(full) {
    let S = "[ ";
    let i = 1;
    while (i < this.frames.length) {
      if (this.frames[i].time > this.now) break;
      i++;
    }
    i--;

    for (let x = 0; x < this.frames.length; ++x) {
      const T = {0: "s", 10: "h", 100: "m"}[this.frames[x].prio];
      const V = this.interp == Timeline.FLOAT ? Math.round(this.frames[x].value)
        : this.frames[x].value;
      if (x == i) S += ">";
      if (full) {
        S += "(" + T + " " +
                   Math.round(100 * (this.frames[x].time - this.now)) / 100 +
                   "," + V + ") ";
      } else {
        S += Math.round(this.frames[x].value) + T + " ";
      }
    }

    return S + "]";
  }

  update(pack) {
    if (pack.length == 0) return;

    if (this.interp == Timeline.FLOAT) {
      const last = pack[pack.length - 1];
      const lastTime = last[0] + this.now;
      const lastValue = this.get(last[0]);
      const delta = last[1] - lastValue;
      for (let i = 0; i < pack.length; ++i) {
        this.set(pack[i][0], pack[i][1], pack[i][2]);
      }
      const endTime = this.frames[this.frames.length - 1].time;
      const deltatime = 100 + endTime - lastTime;
      for (let i = 0; i < this.frames.length; ++i) {
        if (this.frames[i].time <= lastTime) continue;
        if (this.frames[i].prio >= last[2]) continue;
        const distance = (this.frames[i].time - lastTime) * deltatime;
        this.frames[i].value += delta / distance;
      }
    } else if (this.interp == Timeline.VALUE) {
      for (let i = 0; i < pack.length; ++i) {
        this.set(pack[i][0], pack[i][1], pack[i][2]);
      }
      this._removeFrames({prio:Timeline.SCRATCH});
    }

    this.gc();
  }

  _getFirstFrame(prio) {
    for (let i = 0; i < this.frames[i].length; ++i) {
      if (this.frames[i].prio == prio) return this.frames[i];
    }
    return null;
  }

  _getLastFrame(prio) {
    for (let i = this.frames.length - 1; i >= 0; --i) {
      if (this.frames[i].prio == prio) return this.frames[i];
    }
    return null;
  }

  _getFrames(prio) {
    return this.frames.filter(x => x.prio == prio);
  }

  _removeFrames(opts = {}) {
    if (opts.time !== undefined && opts.prio !== undefined) {
      this.frames = this.frames.filter(x =>
        !((x.prio < opts.prio && x.time <= opts.time) ||
          (x.prio == opts.prio && x.time == opts.time)));
    } else if (opts.minprio !== undefined) {
      this.frames = this.frames.filter(x => x.prio >= opts.minprio);
    } else if (opts.prio !== undefined) {
      this.frames = this.frames.filter(x => x.prio != opts.prio);
    } else if (opts.mintime !== undefined) {
      this.frames = this.frames.filter(x => x.time >= opts.mintime);
    }
  }

  set(time, value, prio = Timeline.SCRATCH) {
    // if (this.id == 2 && value <= 21) debugger;

    // if (prio != 0 && prio != 10 && prio != 100) debugger;
    if (value === undefined) {
      value = time;
      time = 0;
    }
    time += this.now;
    this._removeFrames({prio: prio, time: time});

    // if (this.interp == Timeline.FLOAT && !Number.isFinite(value)) debugger;

    let i = 0;
    while (i < this.frames.length) {
      // if (this.frames[i].time == time ) debugger;
      if (this.frames[i].time > time) break;
      i++;
    }
    this.frames.splice(i, 0, {time:time, value: value, prio: prio});

    return value;
  }

  get(time, prio = null) {
    if (time === undefined) time = 0;
    time += this.now;
    const tf = prio == null ? this.frames : this._getFrames(prio);

    if (tf.length == 0) return 0;
    if (tf.length == 1) return tf[0].value;

    // if we are looking for a time before the first value, don't interpolate.
    if (tf[0].time > time) return tf[0].value;

    let i = 1;
    while (i < tf.length) {
      if (tf[i].time > time) break;
      i++;
    }
    i--;
    if (this.interp == Timeline.FLOAT) {
      // forward interpolation:
      if (i == tf.length - 1) return tf[i].value;
      // backward interpolation:
      // if (tf[i].time == tf[i + 1].time) debugger;
      const fraction = (time - tf[i].time) / (tf[i + 1].time - tf[i].time);
      return tf[i].value + fraction * (tf[i + 1].value - tf[i].value);
    } else if (this.interp == Timeline.VALUE) {
      return tf[i].value;
    }
  }
}

Timeline.SCRATCH = 0;
Timeline.HOST = 10;
Timeline.MASTER = 100;

Timeline.VALUE = Symbol("VALUE");
Timeline.FLOAT = Symbol("FLOAT");
