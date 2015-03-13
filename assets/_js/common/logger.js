var OLCS = OLCS || {};

/**
 * Logging component
 */

OLCS.logger = (function(document, $, undefined) {

  "use strict";

  var console = window.console;
  if (!console) {
    console = {
      log: function() {},
      warn: function() {},
      error: function() {},
      group: function() {},
      groupEnd: function() {}
    };
  }

  var exports = {};

  exports.log = function(text) {
    // @TODO support variadic args
    console.log(text);
    return exports;
  };

  exports.warn = function(text) {
    console.warn(text);
    return exports;
  };

  exports.group = function(text) {
    console.group(text);
    return exports;
  };

  exports.groupEnd = function() {
    console.groupEnd();
    return exports;
  };

  return exports;

}(document, window.jQuery));
