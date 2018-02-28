/* global QUnit tln1 tln2 */

QUnit.module("timeline VALUE", window.hooks, function() {
  QUnit.test("track", function(assert) {
    const t = tln1.newTimeline(tln1.Timeline.VALUE, 0);

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
    const t = tln1.newTimeline(tln1.Timeline.VALUE, 0);
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

  QUnit.test("update from hostSync", function(assert) {
    const o = tln1.newTimeline(tln1.Timeline.VALUE, 0);
    o.set(1.5, "c");
    o.set(0.0, "a");
    o.set(1.0, "b");

    const t = tln2.newTimeline(tln2.Timeline.VALUE, 0);
    t.update(o.hostSync());

    assert.equal(t.frames.length, 3);
    assert.deepEqual(t.frames[0],
      {time: 0.0, value: "a", prio: tln2.Timeline.HOST});
    assert.deepEqual(t.frames[1],
      {time: 1.0, value: "b", prio: tln2.Timeline.HOST});
    assert.deepEqual(t.frames[2],
      {time: 1.5, value: "c", prio: tln2.Timeline.HOST});
  });
});
