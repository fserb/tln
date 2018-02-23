/* global QUnit tln1 tln2 */
/* eslint no-underscore-dangle: "off" */

QUnit.module("tln.comm", window.hooks, function() {
  QUnit.test("pubsub single", function(assert) {
    const done = assert.async(2);
    tln1.init();
    tln2.init();

    tln1._comm.subscribe(data => {
      assert.equal(data, "PING");
      done();
    });
    tln2._comm.subscribe(data => {
      assert.equal(data, "PING");
      done();
    });

    tln1._comm.publish("PING");
  });
  QUnit.test("pubsub cross", function(assert) {
    const done = assert.async(4);
    tln1.init();
    tln2.init();

    tln1._comm.subscribe(data => {
      assert.ok(data == "PING" || data == "PONG");
      done();
    });
    tln2._comm.subscribe(data => {
      assert.ok(data == "PING" || data == "PONG");
      done();
    });

    tln1._comm.publish("PING");
    tln2._comm.publish("PONG");
  });
});
