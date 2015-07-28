var OLCS = OLCS || {};

/**
 * OLCS.toggleElement
 *
 * Quite simply, when a 'trigger' element is clicked it displays a 'target'
 * element. The revealed element is then hidden when the user clicks anywhere
 * else on the document. Particularly useful for custom dropdown
 * menus, such as the internal 'Admin menu'.
 *s
 */

OLCS.toggleElement = (function(document, $, undefined) {

  'use strict';

  return function init(options) {

    if (!options || !options.triggerSelector || !options.targetSelector) {
      throw new Error('OLCS.toggleElement requires a triggerSelector and an targetSelector option');
    }

    var trigger  = options.triggerSelector;
    var target= options.targetSelector;

    $(document).on('click', trigger, function(e) {
      e.stopPropagation();
      $(this).toggleClass('active');
      $(target).toggle();
    });

    $(document).on('click', function() {
      if ($(trigger).hasClass('active')) {
        $(target).hide();
        $(trigger).removeClass('active');
      }
    });

  };

}(document, window.jQuery));
