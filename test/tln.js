/* global QUnit tln1 tln2 */
/* eslint no-underscore-dangle: "off" */

QUnit.module("tln.comm", window.hooks, function() {
  QUnit.test("init", function(assert) {
    tln1.init();
    assert.ok(tln1._state);
    assert.ok(tln1._comm);
  });

  QUnit.test("duo init", function(assert) {
    tln1.init();
    tln2.init();
    assert.ok(tln1._state);
    assert.ok(tln1._comm);
    assert.ok(tln2._state);
    assert.ok(tln2._comm);
    assert.notEqual(tln1._state, tln2._state);
    assert.notEqual(tln1._comm, tln2._comm);
  });
});
