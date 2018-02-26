/* global QUnit tln1 tln2 proto */

QUnit.module("tln.comm", window.hooks, function() {
  QUnit.test("pubsub single", function(assert) {
    assert.expect(0);
    const done = assert.async(1);

    tln2.comm.subscribe(msg => {
      if (msg.getFieldForTesting() == 123) {
        done();
      }
    });

    const r = new proto.Message();
    r.setFieldForTesting(123);
    tln1.comm.publish(r);
  });

  QUnit.test("pubsub cross", function(assert) {
    const done = assert.async(2);

    tln1.comm.subscribe(data => {
      assert.notEqual(data.getFieldForTesting(), 1);
      if (data.getFieldForTesting() == 2) done();
    });

    tln2.comm.subscribe(data => {
      assert.notEqual(data.getFieldForTesting(), 2);
      if (data.getFieldForTesting() == 1) done();
    });

    const r = new proto.Message();
    r.setFieldForTesting(1);
    tln1.comm.publish(r);
    r.setFieldForTesting(2);
    tln2.comm.publish(r);
  });
});
