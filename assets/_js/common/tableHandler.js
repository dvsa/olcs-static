var OLCS = OLCS || {};

OLCS.tableHandler = (function(document, $, undefined) {

  "use strict";

  return function init(options) {
    var table = options.table;
    var filter = options.filter || null;
    var container = options.container;


    var selectorString =
      table + " .results-settings a, " +
      table + " .sortable a, " +
      table + " .pagination a";

    $(document).on("click", selectorString, function clickHandler(e) {
      e.preventDefault();

      $.get(
        $(this).attr("href"),
        OLCS.responseFilter(filter, container)
      );
    });
  };

}(document, window.jQuery));
