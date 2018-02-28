/* global QUnit tln1 */

QUnit.module("timeline VALUE", window.hooks, function() {
  QUnit.test("track", function(assert) {
    const t = tln1.newTimeline(tln1.Timeline.VALUE);

    assert.equal(t.get(0.0), null);
    t.set(0.0, "a");
    t.set(1.0, "b");

    assert.equal(t.get(-1), "a");
    assert.equal(t.get(-0.01), "a");
    assert.equal(t.get(0), "a");
    assert.equal(t.get(0.01), "a");
    assert.equal(t.get(0.5), "a");
    assert.equal(t.get(0.99), "a");
    assert.equal(t.get(1.0), "b");
    assert.equal(t.get(1.01), "b");
    assert.equal(t.get(10), "b");
  });

  QUnit.test("hostSync", function(assert) {
    const t = tln1.newTimeline(tln1.Timeline.VALUE);
    t.set(1.5, "c");
    t.set(0.0, "a");
    t.set(1.0, "b");

    const pack = t.hostSync();
    assert.equal(pack.length, 3);
    assert.deepEqual(pack[0], [0, "a", 10]);
    assert.deepEqual(pack[1], [1, "b", 10]);
    assert.deepEqual(pack[2], [1.5, "c", 10]);

    assert.equal(t.frames.length, 3);
    for (let i = 0; i < 3; ++i) {
      assert.equal(t.frames[i].prio, tln1.Timeline.HOST);
    }
  });
});
