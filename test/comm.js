/* global QUnit tln1 tln2 */

QUnit.module("tln.comm", window.hooks, function() {
  QUnit.test("pubsub single", function(assert) {
    assert.expect(0);
    const done = assert.async(1);

    tln2.comm.subscribe("*", (pid, data) => {
      if (data["PING"]) done();
    });

    tln1.comm.publish({PING: true});
  });

  QUnit.test("pubsub cross", function(assert) {
    assert.expect(0);
    const done = assert.async(2);

    tln1.comm.subscribe("*", (pid, data) => {
      if (data["PONG"]) done();
    });
    tln2.comm.subscribe("*", (pid, data) => {
      if (data["PING"]) done();
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
});
