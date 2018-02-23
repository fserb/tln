// TLN

import Timeline from "./Timeline.js";
import Timestate from "./Timestate.js";
import TimeObject from "./Timeobject.js";

import CommLocal from "./comm/CommLocal.js";

const DEFAULT_PARAMS = {
  commSystem: "local",
  commLocalLag: 0,
};

class TLN {
  constructor() { }

  init(params = {}) {
    this.params = Object.assign({}, DEFAULT_PARAMS, params);
    this._comm = null;
    switch(this.params.commSystem) {
    case "local": this._comm = new CommLocal(this.params.commLocalLag);
    }
    this._state = new Timestate(this._comm);
  }
}
TLN.prototype.TLN = TLN;
TLN.prototype.Timeline = Timeline;
TLN.prototype.Timestate = Timestate;
TLN.prototype.TimeObject = TimeObject;

const tln = new TLN();

export default tln;
