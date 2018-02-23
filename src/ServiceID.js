
import C from "./Consts.js";

export default class ServiceID {
  constructor(tln) {
    this._tln = tln;
    this._tln.comm.subscribe("hello", this.receiveHello.bind(this));

    this._knownIDs = new Set();
    this._askForID();
    this._waintingHello = null;
  }

  _askForID(forcedID = 0) {
    this._tln.comm.id = 0;
    this._preID = forcedID ||
      (1 + Math.floor(Math.random() * (1 << C.ID_BITS)));
    this._preGUID = btoa(navigator.userAgent + ":" + performance.now());
    this._tln.comm.publish({ "hello":
      { "req": this._preID, "guid": this._preGUID } });
    clearTimeout(this._waintingHello);
    this._waintingHello = setTimeout(this._forceID.bind(this),
      this._tln.params.serviceHelloWaitTime * 1000);
  }

  _forceID() {
    clearTimeout(this._waintingHello);
    this._tln.comm.id = this._preID;
    this._knownIDs.add(this._tln.comm.id);
    this._preID = 0;
  }

  receiveHello(pid, payload) {
    if (payload["guid"] == this._preGUID) return;
    this._knownIDs.add(pid);

    if (this._tln.comm.id != 0) {
      if ("req" in payload) {
        const req = payload["req"];
        if (this._knownIDs.has(req)) {
          let sug = -1;
          for (let i = 0; i < (1 << C.ID_BITS); ++i) {
            const s = (this._tln.comm.id + i) % (1 << C.ID_BITS);
            if (s == 0 || this._knownIDs.has(s)) continue;
            sug = s;
            break;
          }
          this._tln.comm.publish({ "hello": { "not": req, "sug": sug }});
        } else {
          this._knownIDs.add(req);
          this._tln.comm.publish({ "hello": { "ok": req }});
        }
      }
    } else {
      if ("not" in payload && this._preID == payload["not"]) {
        this._tln.comm.id = 0;
        this._askForID(payload["sug"]);
      } else if ("ok" in payload && this._preID == payload["ok"]) {
        this._forceID();
      } else if ("req" in payload && this._preID == payload["req"]) {
        this._askForID();
        this._tln.comm.publish({ "hello": { "not": payload["req"] }});
      }
    }
  }
}
