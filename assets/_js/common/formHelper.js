var OLCS = OLCS || {};

OLCS.formHelper = (function(document, $, undefined) {

  'use strict';

  /**
   * Expose a jQuery-esque function which tries to work
   * out which actual public property to invoke purely
   * based off argument length. Pretty crude, but a
   * handy shorthand
   */
  var exports = function() {
    switch (arguments.length) {
      case 1:
        return exports.fieldset.apply(null, arguments);
      case 2:
        return exports.input.apply(null, arguments);
    }
  };

  /**
   * public interface
   */
  exports.fieldset = function(selector) {
    return $("html").find("fieldset[data-group='" + selector + "']");
  };

  exports.input = function(fieldset, name) {
    return $("html").find("[name=" + fieldset + "\\[" + name + "\\]]");
  };

  return exports;

}(document, window.jQuery));
