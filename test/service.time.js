/* global QUnit tln1 tln2 proto */
/* eslint no-underscore-dangle: "off" */

QUnit.module("tln.service.time", window.hooks, function() {
  QUnit.test("sync time zero no lag", function(assert) {
    const done = assert.async(1);

    let p = Promise.resolve("");

    for (let i = 0; i < 20; ++i) {
      p = p.delay(0).then(() => {
        tln1.comm.publish(tln1._serviceTime.appendTime(new proto.Message()));
        tln2.comm.publish(tln2._serviceTime.appendTime(new proto.Message()));
        if (i == 19) {
          const d1 = tln1.comm._timeDrift;
          const d2 = tln2.comm._timeDrift;
          assert.notEqual(d1, 0);
          assert.notEqual(d2, 0);
          assert.ok(Math.abs(d1) < 0.001);
          assert.ok(Math.abs(d2) < 0.001);
          const p12 = tln1.comm.ping(tln2.comm.id);
          const p21 = tln2.comm.ping(tln1.comm.id);
          assert.ok(p12 < 0.015);
          assert.ok(p21 < 0.015);
          const deltaPing = Math.abs(p12 - p21);
          assert.ok(deltaPing < 0.001);
          done();
        }
      });
    }
  });

  QUnit.test("sync time big no lag", function(assert) {
    const done = assert.async(1);

    tln1.comm._timeDrift = -36000;  // 10h behind.

    let p = Promise.resolve("");

    for (let i = 0; i < 30; ++i) {
      p = p.delay(0).then(() => {
        tln1.comm.publish(tln1._serviceTime.appendTime(new proto.Message()));
        tln2.comm.publish(tln2._serviceTime.appendTime(new proto.Message()));
        if (i == 29) {
          const delta = tln1.time() - tln2.time();
          assert.ok(Math.abs(delta) < 0.001);
          const p12 = tln1.comm.ping(tln2.comm.id);
          const p21 = tln2.comm.ping(tln1.comm.id);
          assert.ok(p12 < 0.015);
          assert.ok(p21 < 0.015);
          const deltaPing = Math.abs(p12 - p21);
          assert.ok(deltaPing < 0.0001);
          done();
        }
      });
    }
  });

  QUnit.test("sync time zero lag", function(assert) {
    const done = assert.async(1);

    tln1.comm.lag = 25;
    tln2.comm.lag = 25;

    let p = Promise.resolve("");

    for (let i = 0; i < 20; ++i) {
      p = p.delay(30).then(() => {
        tln1.comm.publish(tln1._serviceTime.appendTime(new proto.Message()));
        tln2.comm.publish(tln2._serviceTime.appendTime(new proto.Message()));
        if (i == 19) {
          const d1 = tln1.comm._timeDrift;
          const d2 = tln2.comm._timeDrift;
          assert.notEqual(d1, 0);
          assert.notEqual(d2, 0);
          assert.ok(Math.abs(d1) < 0.005);
          assert.ok(Math.abs(d2) < 0.005);
          const p12 = tln1.comm.ping(tln2.comm.id);
          const p21 = tln2.comm.ping(tln1.comm.id);
          assert.ok(Math.abs(p12 - 0.050) < 0.05);
          assert.ok(Math.abs(p21 - 0.050) < 0.05);
          const deltaPing = Math.abs(p12 - p21);
          assert.ok(deltaPing < 0.001);
          done();
        }
      });
    }
  });

  QUnit.test("sync time big lag", function(assert) {
    const done = assert.async(1);

    tln1.comm.lag = 25;
    tln2.comm.lag = 25;

    tln1.comm._timeDrift = 36000;  // 10h behind.

    let p = Promise.resolve("");

    for (let i = 0; i < 20; ++i) {
      p = p.delay(30).then(() => {
        tln1.comm.publish(tln1._serviceTime.appendTime(new proto.Message()));
        tln2.comm.publish(tln2._serviceTime.appendTime(new proto.Message()));
        if (i == 19) {
          const delta = tln1.time() - tln2.time();
          assert.ok(Math.abs(delta) < 0.005);
          const p12 = tln1.comm.ping(tln2.comm.id);
          const p21 = tln2.comm.ping(tln1.comm.id);
          assert.ok(Math.abs(p12 - 0.050) < 0.05);
          assert.ok(Math.abs(p21 - 0.050) < 0.05);
          const deltaPing = Math.abs(p12 - p21);
          assert.ok(deltaPing < 0.001);
          done();
        }
      });
    }
  });
});
