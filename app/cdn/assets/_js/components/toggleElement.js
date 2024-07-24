var OLCS = OLCS || {};

/**
 * Toggle element
 *
 * When a 'trigger' element is clicked it displays a 'target'
 * element. The revealed element is then hidden when the user clicks
 * anywhere else on the document. Particularly useful for custom
 * dropdown menus, such as the internal 'Admin menu'.
 *
 */

OLCS.toggleElement = (function(document, $, undefined) {

  'use strict';

  return function init(options) {

    if (!options || !options.triggerSelector || !options.targetSelector) {
      throw new Error('OLCS.toggleElement requires a triggerSelector and an targetSelector option');
    }

    var trigger  = options.triggerSelector;
    var target   = options.targetSelector;

    function hide() {
      $(trigger).removeClass('active');
      $(target).removeAttr('style');
    }

    $(document).on('click', trigger, function(e) {
      e.stopPropagation();
      if ($(this).hasClass('active')) {
        hide();
      } else {
        $(this).addClass('active');
        $(target).show();
      }
    });

    $(document).on('click', function() {
      if ($(trigger).hasClass('active')) {
        hide();
      }
    });

  };

}(document, window.jQuery));
