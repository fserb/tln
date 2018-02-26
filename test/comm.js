/* global QUnit tln1 tln2 proto */

QUnit.module("tln.comm", window.hooks, function() {
  QUnit.test("pubsub single", function(assert) {
    assert.expect(0);
    const done = assert.async(1);

    tln2.comm.subscribe(msg => {
      if (msg.fieldForTesting == 123) {
        done();
      }
    });

    const r = new proto.Message();
    r.fieldForTesting = 123;
    tln1.comm.publish(r);
  });

  QUnit.test("pubsub cross", function(assert) {
    const done = assert.async(2);

    tln1.comm.subscribe(data => {
      assert.notEqual(data.fieldForTesting, 1);
      if (data.fieldForTesting == 2) done();
    });

    tln2.comm.subscribe(data => {
      assert.notEqual(data.fieldForTesting, 2);
      if (data.fieldForTesting == 1) done();
    });

    const r = new proto.Message();
    r.fieldForTesting = 1;
    tln1.comm.publish(r);
    r.fieldForTesting = 2;
    tln2.comm.publish(r);
  });

  QUnit.test("genNewID", function(assert) {
    assert.notEqual(tln1.comm.id, 0);
    assert.notEqual(tln2.comm.id, 0);
    const seen = new Set();
    for (let i = 0; i < 100; ++i) {
      const g1 = tln1.comm.genNewID();
      const g2 = tln2.comm.genNewID();
      assert.notOk(seen.has(g1));
      seen.add(g1);
      assert.notOk(seen.has(g2));
      seen.add(g2);
    }
  });
});
