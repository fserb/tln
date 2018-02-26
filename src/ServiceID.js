
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
    m.serviceId = new proto.ServiceId();
    m.serviceId.status = proto.ServiceId.Status.REQUEST;
    m.serviceId.guid = this._GUID;
    m.serviceId.request = this._preID;
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
    if (!msg.serviceId) return;
    const mid = msg.serviceId;
    // we need to block our own messages before we have IDs.
    if (mid.guid == this._GUID) return;
    this._knownIDs.add(msg.id);

    const res = new proto.Message();
    const rid = new proto.ServiceId();
    res.serviceId = rid;
    rid.request = mid.request;

    if (this._tln.comm.id != 0) {
      if (mid.status == proto.ServiceId.Status.REQUEST) {
        const req = mid.request;
        if (this._knownIDs.has(req)) {
          let sug = -1;
          for (let i = 0; i < (1 << C.ID_BITS); ++i) {
            const s = (this._tln.comm.id + i) % (1 << C.ID_BITS);
            if (s == 0 || this._knownIDs.has(s)) continue;
            sug = s;
            break;
          }
          rid.status = proto.ServiceId.Status.DENIED;
          rid.suggestion = sug;
        } else {
          this._knownIDs.add(req);
          rid.status = proto.ServiceId.Status.ACCEPT;
        }
        rid.request = req;
        this._tln.comm.publish(res);
      }
    } else if (mid.request == this._preID) {
      rid.guid = this._GUID;
      if (mid.status == proto.ServiceId.Status.DENIED) {
        this._askForID(mid.suggestion);
      } else if (mid.status == proto.ServiceId.Status.ACCEPT) {
        this._forceID();
      } else {
        this._askForID();
        rid.status = proto.ServiceId.Status.DENIED;
        this._tln.comm.publish(res);
      }
    } else if (mid.status == proto.ServiceId.Status.REQUEST) {
      this._schedule(() => this._askForID());
    }
  }
}
