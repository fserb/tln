/* global QUnit tln1 tln2 */

QUnit.module("timeline FLOAT", window.hooks, function() {
  QUnit.test("track", function(assert) {
    const t = tln1.newTimeline(tln1.Timeline.FLOAT, 0);

    assert.equal(t.get(0.0), 0);
    t.set(0.0, 10.0);
    t.set(1.0, 100.0);

    assert.equal(t.get(-1), 10.0);
    assert.equal(t.get(-0.01), 10.0);
    assert.equal(t.get(0), 10.0);
    assert.equal(t.get(0.01), 10.9);
    assert.equal(t.get(0.5), 55);
    assert.equal(t.get(0.99), 99.1);
    assert.equal(t.get(1.0), 100.0);
    assert.equal(t.get(1.01), 100.0);
    assert.equal(t.get(10), 100.0);
  });

  QUnit.test("hostSync", function(assert) {
    const t = tln1.newTimeline(tln1.Timeline.FLOAT, 0);
    t.set(1.5, 100.0);
    t.set(0.0, 0.0);
    t.set(1.0, 10.0);

    const pack = t.hostSync();
    assert.equal(pack.length, 1);
    assert.deepEqual(pack[0], [1.5, 100.0, 10]);

    assert.equal(t.frames.length, 1);
    assert.equal(t.frames[0].time, 1.5);
    assert.equal(t.frames[0].value, 100.0);
    assert.equal(t.frames[0].prio, tln1.Timeline.HOST);
  });

  QUnit.test("update from hostSync", function(assert) {
    const o = tln1.newTimeline(tln1.Timeline.FLOAT, 0);
    o.set(1.5, 100.0);
    o.set(0.0, 0.0);
    o.set(1.0, 10.0);

    const t = tln2.newTimeline(tln2.Timeline.FLOAT, 0);
    t.update(o.hostSync());

    assert.equal(t.frames.length, 1);
    assert.deepEqual(t.frames[0],
      {time: 1.5, value: 100.0, prio: tln2.Timeline.HOST});
  });
});
