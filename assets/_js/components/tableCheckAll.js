var OLCS = OLCS || {};

/**
 * Table check all
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

    $(document).on('click', options.selector, function() {
      
      console.log($(this).prop('checked'));

      var table = $(this).closest('table');
      var tableRow = table.find('tr');

      $(table).find('[type="checkbox"]').each(function() {
      });
      
      if ($(this).prop('checked', true)) {
        tableRow.removeClass('checked');
      } else {
        tableRow.addClass('checked');
      }
        
    });
  };

}(document, window.jQuery));
