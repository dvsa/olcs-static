(function() {
  "use strict";

  OLCS.logger.setLevel("ERROR");

  beforeEach(function() {
    OLCS.eventEmitter.listeners = {};
  });

  afterEach(function() {
    // any global teardown?
  });
}());
