var OLCS = OLCS || {};

/**
 * Small utility belt. To be honest, we might be better off
 * just using something like lodash if this grows too big.
 */

OLCS.utils = (function(document, $, undefined) {

  "use strict";

  var exports = {};

  exports.extend = function(destination, source) {
    for (var k in source) {
      if (source.hasOwnProperty(k)) {
        destination[k] = source[k];
      }
    }
    return destination;
  };

  return exports;

}(document, window.jQuery));
