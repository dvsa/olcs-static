var OLCS = OLCS || {};

/**
 * OLCS.tableCheckAll
 *
 * Add listeners for the 'check all' checkbox present on
 * various CRUD tables
 */

OLCS.tableCheckAll = (function(document, $, undefined) {

  'use strict';

  return function init(options) {

    var defaultOptions = {
      selector: 'input[name="checkall"]'
    };

    options = $.extend(defaultOptions, options);

    $(document).on('change', options.selector, function() {

      var table = $(this).closest('table');

      $(table).find('input[type="checkbox"]').not(options.selector).not(':disabled')
        .prop('checked', $(this).is(':checked'));
    });
  };

}(document, window.jQuery));
