/* global QUnit tln1 tln2 */
/* eslint no-underscore-dangle: "off" */

QUnit.module("tln.service.id", window.hooks, function() {
  QUnit.test("auto ids", function(assert) {
    const done = assert.async(1);
    const objs = [tln1, tln2];

    const checkID = function() {
      if (objs.length == 0) {
        assert.notEqual(tln1.comm.id, 0);
        assert.notEqual(tln2.comm.id, 0);
        assert.notEqual(tln1.comm.id, tln2.comm.id);
        return done();
      }
      if (objs[0].comm.id != 0) objs.shift();
      setTimeout(checkID, 1);
    };
    checkID();
  });

  QUnit.test("fail id", function(assert) {
    const done = assert.async(1);
    tln1._serviceID._askForID(1);
    tln2._serviceID._askForID(1);

    const objs = [tln1, tln2];

    const checkID = function() {
      if (objs.length == 0) {
        assert.notEqual(tln1.comm.id, 0);
        assert.notEqual(tln2.comm.id, 0);
        assert.notEqual(tln1.comm.id, tln2.comm.id);
        return done();
      }
      if (objs[0].comm.id != 0) objs.shift();
      setTimeout(checkID, 1);
    };
    checkID();
  });
});
