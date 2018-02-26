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
});
