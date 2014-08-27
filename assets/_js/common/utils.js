var OLCS = OLCS || {};

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
