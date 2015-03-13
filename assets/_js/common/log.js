var OLCS = OLCS || {};

/**
 * Logging component
 */

OLCS.log = (function(document, $, undefined) {

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

  var exports = function() {
    return exports.log.apply(null, arguments);
  };

  exports.log = function(options) {
    if (typeof options === "string") {
      options = {
        level: "log",
        text: options
      };
    }

    // @TODO support variadic args
    return console[options.level](options.text);
  };

  exports.group = function(text) {
    return console.group(text);
  };

  exports.groupEnd = function() {
    return console.groupEnd();
  };

  return exports;

}(document, window.jQuery));
