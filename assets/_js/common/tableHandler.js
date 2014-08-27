var OLCS = OLCS || {};

OLCS.tableHandler = (function(document, $, undefined) {

  "use strict";

  return function init(options) {
    var table = options.table;
    var filter = options.filter || null;
    var container = options.container;

    var actionSelector = table + " .table__header [name=action]";

    var linkSelector =
      table + " .results-settings a, " +
      table + " .sortable a, " +
      table + " .pagination a";

    /**
     * Pagination and sorting links
     */
    $(document).on("click", linkSelector, function clickHandler(e) {
      e.preventDefault();

      $.get(
        $(this).attr("href"),
        OLCS.responseFilter(filter, container)
      );
    });

    /**
     * Form action links
     */
    $(document).on("click", actionSelector, function(e) {
      e.preventDefault();

      var form = $(this).parents("form");
      var actionValue = $(this).val();

      if (form.find(".form__action").length === 0) {
        form.prepend("<input class=form__action type=hidden name=action />");
      }

      form.find(".form__action").val(actionValue);

      // submit the *table* form
      OLCS.formAjax(form, OLCS.normaliseResponse(function(data) {

        OLCS.modal.show(data.body, data.title);

        var handler = OLCS.formHandler({
          form: ".modal__content form",
          container: ".modal__content",
          onChange: false
        });

        // @TODO EventEmitter?
        OLCS.modal.on("hide", function() {
          handler.off();
        });
      }));
    });
  };

}(document, window.jQuery));
