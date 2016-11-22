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
      loadingText: false
    }, custom);

    $(options.container).each(function() {

      var container = $(this);
      var actions = container.find(options.actions);

      // When any action is clicked
      actions.on('click', function() {

        var target = $(this);

        // Add disabled class to relevant actions
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