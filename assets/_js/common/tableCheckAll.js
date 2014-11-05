
OLCS.tableCheckAll = (function(document, $, undefined) {

  return function init(options) {

    var defaultOptions = {
      selector: 'input[name="checkall"]'
    };

    options = $.extend(defaultOptions, options);

    $(document).on('change', options.selector, function() {

      var table = $(this).closest('table');

      $(table).find('input[type="checkbox"]').not(options.selector).prop('checked', $(this).is(':checked'));
    });
  };

}(document, window.jQuery));
