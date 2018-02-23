/* global QUnit tln1 tln2 */

QUnit.module("tln.comm", window.hooks, function() {
  QUnit.test("init", function(assert) {
    assert.expect(0);
    tln1.init();
  });

  QUnit.test("multi init", function(assert) {
    assert.expect(0);
    tln1.init();
    tln2.init();
  });
});
