var OLCS = OLCS || {};

/**
 * Disable form
 *
 * Tools to provide disabling buttons and changing submit button
 * text when form is submitted
 *
 * grunt test:single --target=disableForm
 */

OLCS.disableForm = (function(document, $, undefined) {

  'use strict';

  return function init(custom) {

    var options = $.extend({
      errorContainer : '',
    }, custom);

  };

}(document, window.jQuery));