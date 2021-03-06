// TLN

// import C from "./Consts.js";

import Timeline from "./Timeline.js";
import TimeObject from "./TimeObject.js";
import EventQueue from "./EventQueue.js";
// import Timestate from "./Timestate.js";

import ServiceID from "./ServiceID.js";
import ServiceTime from "./ServiceTime.js";
import ServiceEntity from "./ServiceEntity.js";

import CommLocal from "./comm/CommLocal.js";

const DEFAULT_PARAMS = {
  commSystem: "local",
  commLocalLag: 0,
  servicesHelloWaitTime: 1.0,
  forceID: 0,
  debug: false,
};

class TLN {
  constructor() { }

  init(params = {}) {
    this.params = Object.assign({}, DEFAULT_PARAMS, params);

    this._objects = [];

    this.comm = null;
    switch(this.params.commSystem) {
    case "local": this.comm = new CommLocal(this.params);
    }

    return this.comm.done.then(() => {
      if (this.params.forceID) {
        this.comm.id = this.params.forceID;
      }
      this._serviceID = new ServiceID(this);
      this._serviceTime = new ServiceTime(this);
      this._serviceEntity = new ServiceEntity(this);
      this._eventQueue = new EventQueue(this);
      // this._state = new Timestate(this.comm);
    });
  }

  // returns current time in seconds (high precision), adjusted to
  // sync with current network.
  time() {
    return this.comm._timeDrift + (window.performance.now() / 1000);
  }

  newTimeline(interpolation, id) {
    return new Timeline(interpolation, id);
  }

  register(name, create, floatFields, valueFields) {
    this._serviceEntity.register(name, create, floatFields, valueFields);
  }

  create(parent, name, ...args) {
    return this._serviceEntity.create(parent, name, ...args);
  }

  track(target, floatFields, valueFields) {
    const to = new TimeObject(target, floatFields, valueFields);
    this._objects.push(to);
    return to;
  }
}
TLN.prototype.TLN = TLN;
TLN.DEFAULT_PARAMS = DEFAULT_PARAMS;
TLN.prototype.Timeline = Timeline;
TLN.prototype.TimeObject = TimeObject;
// TLN.prototype.Timestate = Timestate;

const tln = new TLN();

export default tln;
