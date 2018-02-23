/* global QUnit tln1 tln2 */
/* eslint no-underscore-dangle: "off" */

QUnit.module("tln.comm", window.hooks, function() {
  QUnit.test("pubsub single", function(assert) {
    assert.expect(0);
    const done = assert.async(2);

    tln1.comm.subscribe("*", (pid, data) => {
      if (data["PING"]) done();
    });
    tln2.comm.subscribe("*", (pid, data) => {
      if (data["PING"]) done();
    });

    tln1.comm.publish({PING: true});
  });

  QUnit.test("pubsub cross", function(assert) {
    assert.expect(0);
    const done = assert.async(4);

    tln1.comm.subscribe("*", (pid, data) => {
      if (data["PING"] || data["PONG"]) done();
    });
    tln2.comm.subscribe("*", (pid, data) => {
      if (data["PING"] || data["PONG"]) done();
    });

    tln1.comm.publish({PING: true});
    tln2.comm.publish({PONG: true});
  });

  QUnit.test("sub single", function(assert) {
    const done = assert.async(4);

    tln1.comm.subscribe("a", (pid, data) => {
      assert.equal(data, "resa");
      done();
    });
    tln1.comm.subscribe("b", (pid, data) => {
      assert.equal(data, "resb");
      done();
    });
    tln1.comm.subscribe("*", (pid, data) => {
      if (data["b"] == "resb" || data["a"] == "resa") done();
    });

    tln2.comm.publish({a: "resa"});
    tln2.comm.publish({b: "resb"});
  });

  QUnit.test("auto ids", function(assert) {
    const done = assert.async(1);
    const objs = [tln1, tln2];

    const checkID = function() {
      if (objs.length == 0) {
        assert.notEqual(tln1.comm.id, 0);
        assert.notEqual(tln2.comm.id, 0);
        assert.notEqual(tln1.comm.id, tln2.comm.id);
        return done();
      }
      if (objs[0].comm.id != 0) objs.shift();
      setTimeout(checkID, 1);
    };
    checkID();
  });

  QUnit.test("fail id", function(assert) {
    const done = assert.async(1);
    tln1._serviceID._askForID(1);
    tln2._serviceID._askForID(1);

    const objs = [tln1, tln2];

    const checkID = function() {
      if (objs.length == 0) {
        assert.notEqual(tln1.comm.id, 0);
        assert.notEqual(tln2.comm.id, 0);
        assert.notEqual(tln1.comm.id, tln2.comm.id);
        return done();
      }
      if (objs[0].comm.id != 0) objs.shift();
      setTimeout(checkID, 1);
    };
    checkID();
  });
});
