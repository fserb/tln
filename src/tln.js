// TLN

// import C from "./Consts.js";

import Timeline from "./Timeline.js";
import Timestate from "./Timestate.js";
import TimeObject from "./Timeobject.js";

import ServiceID from "./ServiceID.js";
import ServiceTime from "./ServiceTime.js";

import CommLocal from "./comm/CommLocal.js";

const DEFAULT_PARAMS = {
  commSystem: "local",
  commLocalLag: 0,
  servicesHelloWaitTime: 1.0,
  forceID: 0,
};

class TLN {
  constructor() { }

  init(params = {}) {
    this.params = Object.assign({}, DEFAULT_PARAMS, params);
    this.comm = null;
    switch(this.params.commSystem) {
    case "local": this.comm = new CommLocal(this.params.commLocalLag);
    }
    return this.comm.done.then(() => {
      if (this.params.forceID) {
        this.comm.id = this.params.forceID;
      }
      this._serviceID = new ServiceID(this);
      this._serviceTime = new ServiceTime(this);
      // this._state = new Timestate(this.comm);
    });
  }
}
TLN.prototype.TLN = TLN;
TLN.DEFAULT_PARAMS = DEFAULT_PARAMS;
TLN.prototype.Timeline = Timeline;
TLN.prototype.Timestate = Timestate;
TLN.prototype.TimeObject = TimeObject;

const tln = new TLN();

export default tln;
