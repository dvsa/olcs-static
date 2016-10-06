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
      container: '.actions-container',
      actions: '[type="submit"], [class*="action-"]',
      disabledClass: 'disabled',
      loadingText: 'Loading...'
    }, custom);

    $(options.container).each(function() {

      var container = $(this);
      var actions = container.find(options.actions);

      actions.on('click', function() {

        var target = $(this);

        actions.addClass(options.disabledClass);
      
        // Change target button text during interim
        if (options.loadingText) {
          if (target.is('input')) {
            target.val(options.loadingText);
          } else {
            target.html(options.loadingText);
          }
        }

      });

    });

  };

}(document, window.jQuery));