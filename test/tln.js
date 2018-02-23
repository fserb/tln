/* global QUnit tln1 tln2 */
/* eslint no-underscore-dangle: "off" */

QUnit.module("tln", window.hooks, function() {
  QUnit.test("init", function(assert) {
    assert.ok(tln1._state);
    assert.ok(tln1.comm);
    assert.ok(tln2._state);
    assert.ok(tln2.comm);
    assert.notEqual(tln1._state, tln2._state);
    assert.notEqual(tln1.comm, tln2.comm);
  });
});
