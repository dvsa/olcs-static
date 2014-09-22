var OLCS = OLCS || {};

/**
 * EventEmitter
 */

OLCS.eventEmitter = (function(document, $, undefined) {

  "use strict";

  var exports = {
    listeners: {},

    on: function(event, handler) {
      if (!exports.listeners[event]) {
        exports.listeners[event] = [];
      }
      exports.listeners[event].push(handler);
    },

    once: function(event, handler) {
      exports.on(event, function() {
        handler.apply(exports, arguments);
        exports.off(event);
      });
    },

    off: function(event) {
      exports.listeners[event] = [];
    },

    emit: function(event, args) {
      if (exports.listeners[event]) {
        for (var i = 0, j = exports.listeners[event].length; i < j; i++) {
          var handler = exports.listeners[event][i];

          // we might have > 1 listeners but they might have called
          // 'off' which will truncate the array, so allow for handler
          // no longer existing
          if (handler) {
            handler.apply(exports, args || []);
          }
        }
      }
    }
  };

  return exports;

}(document, window.jQuery));
