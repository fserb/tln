// Server?

const SERVERB = [0, 35, 250, 50, 150];
const GLOBAL_DELAY = 1.0;

const server = (function() {
  const delay = b => GLOBAL_DELAY * 1000 +
    Math.max(0, b * (1.0 + 0.2 * Math.random()));
  const pubsub = {};
  let ddd = 0;
  return {
    addDelay: function(d) {
      ddd += d;
    },
    time: function() {
      return window.performance.now() / 1000.0 - ddd;
    },
    subscribe: function(name, id, cb) {
      const d1 = SERVERB[id];
      if (!pubsub[name]) pubsub[name] = [];
      pubsub[name].push(
        (value, d2) => {
          setTimeout(cb.bind(this, value), delay((d2 + d1) / 2.0));
        }
      );
    },
    publish: function(name, id, value) {
      if (!pubsub[name]) return;
      for (const f of pubsub[name]) {
        f(JSON.parse(JSON.stringify(value)), SERVERB[id]);
      }
    },
  };
})();

export {server, SERVERB};
