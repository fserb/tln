// import C from "./Consts.js";
// import proto from "./Message_pb.js";

export default class ServiceEntity {
  constructor(tln) {
    this._tln = tln;
    this._creators = {};
  }

  register(name, create, floatFields, valueFields) {
    this._creators[name] = {create: create, floatFields: floatFields,
      valueFields: valueFields};
  }

  create(name, ...args) {
    const c = this._creators[name];
    const e = c.create(...args);
    this._tln.track(e, c.floatFields, c.valueFields);
    return e;
  }
}
