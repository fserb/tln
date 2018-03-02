// tests.js

/* global QUnit $ sinon tln */
/* eslint no-underscore-dangle: "off" */

QUnit.config.noglobals = true;
// QUnit.config.hidepassed = true;
QUnit.config.testTimeout = 5000;
QUnit.config.seed = String(Math.random());

window.tln1 = window.tln2 = null;

window.proto = window.protobuf.roots["default"];

window.hooks = {
  beforeEach: function(assert) {
    tln.TLN.DEFAULT_PARAMS.commSystem = "local";
    tln.TLN.DEFAULT_PARAMS.commLocalLag = 1;
    window.tln = window.tln1 = new tln.TLN();
    window.tln2 = new tln.TLN();
    const par = {
      commSystem: "local",
      commLocalLag: 0,
      servicesHelloWaitTime: 0.1,
      debug: (window.location.href.indexOf("testId") != -1),
    };
    Promise.all([
      window.tln1.init(Object.assign({}, par, {forceID: 1})),
      window.tln2.init(Object.assign({}, par, {forceID: 2}))])
      .then(assert.async());
  },
  afterEach: function() {
    if (window.location.href.indexOf("testId") == -1) {
      window.tln1.comm._resetForTesting();
      window.tln1 = window.tln2 = null;
    }
  }
};

QUnit.show = function() {
  $("#qunit-fixture").css({
    height: "auto",
    width: "100%",
    left: 0,
    top: 0,
    boxSizing: "border-box",
    position: "relative",
    backgroundColor: "#CCC",
    border: "3px solid #0D3349",
    marginTop: "10px",
  });
};

if (window.location.href.indexOf("testId") != -1) {
  QUnit.show();
}

function delay(t, ...args) {
  return new Promise(function(resolve) {
    setTimeout(resolve.bind(null, ...args), t);
  });
}

Promise.prototype.delay = function(t) {
  return this.then(function(...args) {
    return delay(t, ...args);
  });
};

sinon.expectation.fail = sinon.assert.fail = function(msg) {
  QUnit.assert.ok(false, msg);
};

sinon.assert.pass = function(assertion) {
  QUnit.assert.ok(true, assertion);
};

sinon.config = {
  injectIntoThis: true,
  injectInto: null,
  properties: ["spy", "stub", "mock", "clock", "sandbox"],
  useFakeTimers: false,
  useFakeServer: false
};
