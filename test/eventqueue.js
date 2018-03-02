/* global QUnit tln1 tln2 proto */
/* eslint no-underscore-dangle: "off" */

QUnit.module("eventqueue", window.hooks, function() {
  QUnit.test("addEvent", function(assert) {
    tln1._eventQueue.addEvent(0.0, "A");
    tln1._eventQueue.addEvent(3.0, "D");
    tln1._eventQueue.addEvent(1.0, "B");
    tln1._eventQueue.addEvent(1.5, "C");
    tln1._eventQueue.addEvent(4.0, "E");

    assert.deepEqual(tln1._eventQueue._events, [
      { time: 0.0, action: "A"},
      { time: 1.0, action: "B"},
      { time: 1.5, action: "C"},
      { time: 3.0, action: "D"},
      { time: 4.0, action: "E"},
    ]);
  });

  QUnit.test("popEvents", function(assert) {
    tln1._eventQueue.addEvent(0.0, "A");
    tln1._eventQueue.addEvent(1.0, "B");
    tln1._eventQueue.addEvent(1.5, "C");
    tln1._eventQueue.addEvent(3.0, "D");
    tln1._eventQueue.addEvent(4.0, "E");

    assert.deepEqual(tln1._eventQueue.popEvents(0.5), [
      { time: 0.0, action: "A" }]);
    assert.deepEqual(tln1._eventQueue.popEvents(0.0), []);
    assert.deepEqual(tln1._eventQueue.popEvents(0.5), []);
    assert.deepEqual(tln1._eventQueue.popEvents(1.5), [
      { time: 1.0, action: "B" }, { time: 1.5, action: "C" }]);
    assert.deepEqual(tln1._eventQueue.popEvents(1.5), []);
    assert.deepEqual(tln1._eventQueue.popEvents(10), [
      { time: 3.0, action: "D" }, { time: 4.0, action: "E" }]);
    assert.deepEqual(tln1._eventQueue.popEvents(15), []);
  });

  QUnit.test("sync", function(assert) {
    assert.propEqual(tln1._eventQueue.sync(0), []);

    tln1._eventQueue.addEvent(0.0, "A");
    tln1._eventQueue.addEvent(1.0, "B");

    assert.propEqual(tln1._eventQueue.sync(10), [
      new proto.Event({time: -10, action: "A", args: "[]"}),
      new proto.Event({time: -9, action: "B", args: "[]"})
    ]);
    assert.propEqual(tln1._eventQueue.sync(0), []);
  });

  QUnit.test("sync", function(assert) {
    tln1._eventQueue.addEvent(0.0, "A");
    tln1._eventQueue.addEvent(1.0, "B");
    tln2._eventQueue.update(tln1._eventQueue.sync(10));

    assert.propEqual(tln2._eventQueue._events, [
      {time: -10, action: "A"},
      {time: -9, action: "B"}
    ]);

    assert.propEqual(tln2._eventQueue.sync(0), []);
  });

});
