/*
- objects are created with all timelines id 0, in a list of "zombie" objects
- objects have parents:
  - if parent is in host: add timeline ids, add to event queue with params.
- when receiving a event queue:
  - calculate distance from existing zombies, if match, just upgrade zombie.
- if zombie object is alive for too much time, just kill it.
- when destroying objects, if hosted, send destroy event. Otherwise don't kill?
*/

export default class ServiceEntity {
  constructor(tln) {
    this._tln = tln;
    this.creators = {};
    this.zombies = [];
  }

  register(name, create, floatFields, valueFields) {
    this.creators[name] = {create: create, floatFields: floatFields,
      valueFields: valueFields};
  }

  create(parent, name, ...args) {
    const c = this.creators[name];
    const entity = c.create(...args);
    const to = this._tln.track(entity, c.floatFields, c.valueFields);
    if (parent === null || parent.host) {
      const ids = to.makeHosted(this._tln);
      this._tln._eventQueue.addEvent(this._tln.time(), name, args, ids);
    } else {
      this.zombies.push({
        timeObject: to,
        creation: this._tln.time(),
        name: name,
        args: args});
    }
    return entity;
  }

  _argsDistance(a, b) {
    let d = 0.0;
    let c = 0;
    for (let i = 0; i < a.length; ++i) {
      if (Number.isFinite(a) && Number.isFinite(b)) {
        d += (a - b) * (a - b);
        c++;
      } else if (a !== b) {
        return 1e99;
      }
    }
    return Math.sqrt(d) / c;
  }

  update() {
    const now = this._tln.time();

    const events = this._tln.eventQueue.popEvents(now);
    for (const ev of events) {
      // find closest zombie that is less than 10 apart.
      let minDist = 10;
      let minZombie = null;
      let minID = 0;
      for (let i = 0; i < this.zombies.length; ++i) {
        const z = this.zombies[i];
        if (z.name != ev.action) continue;
        const d = this._argsDistance(z.args, ev.args);
        if (d < minDist) {
          minDist = d;
          minZombie = z;
          minID = i;
        }
      }

      // if we found, we just update the IDs of that zombie.
      if (minZombie) {
        this.zombies.splice(minID, 1);
        minZombie.timeObject.setIDs(ev.ids);
      } else {
        // otherwise, create a new entity.
        const c = this.creators[ev.action];
        const entity = c.create(...ev.args);
        const to = this._tln.track(entity, c.floatFields, c.valueFields);
        to.setIDs(ev.ids);
      }
    }

    // remove old zombies.
    let i = 0;
    while (i < this.zombies.length) {
      const zo = this.zombies[i];
      const age = now - zo.time;
      if (age >= 1) {
        zo.timeObject.destroy();
        this.zombies.splice(i, 1);
        continue;
      }
      i++;
    }
  }
}
