var OLCS = OLCS || {};

/**
 * Logging component
 */

OLCS.logger = (function(document, $, undefined) {

  "use strict";

  var console = window.console;
  var exports = {};

  if (!console) {
    console = {
      log: function() {},
      warn: function() {},
      error: function() {},
      group: function() {},
      groupEnd: function() {}
    };
  }

  function proxy(method) {
    exports[method] = function() {
      console[method].apply(console, arguments);
      return exports;
    };
  }

  proxy("log");
  proxy("warn");
  proxy("group");
  proxy("groupEnd");

  exports.debug = function(text, source) {
    // @TODO might optionally no-op this based on config etc
    if (source) {
      return exports.log("%cOLCS.%s %c %s", "color:green", source, "color:black", text);
    }

    return exports.log(text);
  };

  return exports;

}(document, window.jQuery));
