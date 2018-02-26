
import C from "./Consts.js";
import proto from "./Message_pb.js";

export default class ServiceID {
  constructor(tln) {
    this._tln = tln;

    this._knownIDs = new Set([0]);
    this._waintingHello = null;
    this._GUID = btoa(
      Math.floor(Math.random() * 2147483648).toString(36) +
      Math.abs(Math.floor(Math.random() * 2147483648)
        ^ performance.now()).toString(36));

    this._tln.comm.subscribe(this.receiveHello.bind(this));

    if (this._tln.comm.id != 0) {
      this._preID = this._tln.comm.id;
      this._forceID();
    } else {
      this._askForID();
    }
  }

  _schedule(f) {
    clearTimeout(this._waintingHello);
    this._waintingHello = setTimeout(f,
      (this._tln.params.serviceHelloWaitTime * (1.0 + Math.random())) * 1000);
  }

  _askForID(forcedID = 0) {
    this._tln.comm.id = 0;
    this._preID = forcedID ||
      (1 + Math.floor(Math.random() * (1 << C.ID_BITS)));

    const m = new proto.Message();
    const mi = new proto.ServiceId();
    m.setServiceId(mi);
    mi.setStatus(proto.ServiceId.Status.REQUEST);
    mi.setGuid(this._GUID);
    mi.setRequest(this._preID);
    this._tln.comm.publish(m);
    this._schedule(() => this._forceID());
  }

  _forceID() {
    clearTimeout(this._waintingHello);
    this._tln.comm.id = this._preID;
    this._knownIDs.add(this._tln.comm.id);
    this._preID = 0;
  }

  receiveHello(msg) {
    if (!msg.hasServiceId()) return;
    const mid = msg.getServiceId();
    // we need to block our own messages before we have IDs.
    if (mid.getGuid() == this._GUID) return;
    this._knownIDs.add(msg.getId());

    const res = new proto.Message();
    const rid = new proto.ServiceId();
    res.setServiceId(rid);
    rid.setRequest(mid.getRequest());

    if (this._tln.comm.id != 0) {
      if (mid.getStatus() == proto.ServiceId.Status.REQUEST) {
        const req = mid.getRequest();
        if (this._knownIDs.has(req)) {
          let sug = -1;
          for (let i = 0; i < (1 << C.ID_BITS); ++i) {
            const s = (this._tln.comm.id + i) % (1 << C.ID_BITS);
            if (s == 0 || this._knownIDs.has(s)) continue;
            sug = s;
            break;
          }
          rid.setStatus(proto.ServiceId.Status.DENIED);
          rid.setSuggestion(sug);
        } else {
          this._knownIDs.add(req);
          rid.setStatus(proto.ServiceId.Status.ACCEPT);
        }
        rid.setRequest(req);
        this._tln.comm.publish(res);
      }
    } else if (mid.getRequest() == this._preID) {
      rid.setGuid(this._GUID);
      if (mid.getStatus() == proto.ServiceId.Status.DENIED) {
        this._askForID(mid.getSuggestion());
      } else if (mid.getStatus() == proto.ServiceId.Status.ACCEPT) {
        this._forceID();
      } else {
        this._askForID();
        rid.setStatus(proto.ServiceId.Status.DENIED);
        this._tln.comm.publish(res);
      }
    } else if (mid.getStatus() == proto.ServiceId.Status.REQUEST) {
      this._schedule(() => this._askForID());
    }
  }
}
