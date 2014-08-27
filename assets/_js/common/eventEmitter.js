var OLCS = OLCS || {};

/**
 * EventEmitter mixin
 *
 * For now, don't use this component directly. Use it as a mixin
 * instead. E.g.
 *
 * OLCS.utils.extend(myObject, OLCS.eventEmitter);
 */

OLCS.eventEmitter = (function(document, $, undefined) {

  "use strict";

  // @TODO I have no doubt whatsoever that when used as a mixin
  // the reference to `this` will be wonky; needs addressing
  // when in use more
  var exports = {
    listeners: {},

    on: function(event, handler) {
      if (!this.listeners[event]) {
        this.listeners[event] = [];
      }
      this.listeners[event].push(handler);
    },

    emit: function(event, args) {
      if (this.listeners[event]) {
        for (var i = 0, j = this.listeners[event].length; i < j; i++) {
          var handler = this.listeners[event][i];
          handler.apply(this, args || []);
        }
      }
    }
  };

  return exports;

}(document, window.jQuery));
