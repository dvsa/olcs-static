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
      actions: '[type="submit"], [class*="action-"]',
      disabledClass: 'disabled',
      loadingText: 'Loading...'
    }, custom);

    // Execute code on all potential actions
    $(options.actions).each(function() {

      // Cache trigger selector
      var trigger = $(this);

      trigger.on('click', function(e) {

        var target = $(this);
        var container = target.parents('.actions-container') || target.parents('form');
        var formActions = container.find(options.actions);

        // Add disabled class to relevant actions
        formActions.addClass(options.disabledClass);

        // Change target button text during interim
        if (options.loadingText) {
          // Ensure button's width does not change/jump
          // target.css('width', target.outerWidth());
          // Replace button's text with loading text
          target.text(options.loadingText);
        }

      });

    });

  };

}(document, window.jQuery));