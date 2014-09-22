var OLCS = OLCS || {};

/**
 * Table Handler
 *
 * Binds listeners to intercept various link clicks (pagination,
 * sort ordering etc) and action button clicks.
 *
 * This makes various assumptions about what we expect back after
 * submitting a table form; as such this may need adapting in future.
 *
 * It's also a bit big compared to other components. It might make
 * sense to split this into smaller ones which this just opts into
 */

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

    var buttonHandler;

    /**
     * Pagination and sorting links
     */
    $(document).on("click", linkSelector, function clickHandler(e) {
      e.preventDefault();

      $.ajax({
        url: $(this).attr("href"),
        success: OLCS.responseFilter(filter, container),
        complete: function() {
          OLCS.eventEmitter.emit("update:" + container);
        }
      });
    });

    /**
     * Form action links
     */
    $(document).on("click", actionSelector, function(e) {
      e.preventDefault();

      var form = $(this).parents("form");
      var actionValue = $(this).val();

      // our backend logic relies on receiving the the value of the action
      // button which was clicked in order to determine what to do.
      // Unfortunately a JS click event + submit combo won't include
      // that info, so we have to manually inject it into the form
      if (form.find(".form__action").length === 0) {
        form.prepend("<input class=form__action type=hidden name=action />");
      }

      form.find(".form__action").val(actionValue);

      // submit the *table* form...
      OLCS.formAjax({
        form: form,
        success: OLCS.normaliseResponse(function(data) {
          // assume that the the modal we get back has a form,
          // so invoke a wrapper component to bind a formHandler
          // and show the modal at the same time
          OLCS.formModal(data);
        })
      });
    });

    /**
     * Controls within the table form
     */

    // for now we assume two things:
    // 1) The edit button is always called 'Edit'
    // 2) We always want to disable mutliple edits
    //
    // Neither of the above may always be true. As soon as they're
    // not, please modify this component to look for more generic
    // attributes, and modify the table builder backend logic so
    // we can opt-in to this behaviour easily
    buttonHandler = OLCS.conditionalButton({
      form: ".table__form",
      label: "Edit",
      predicate: function(length, callback) {
        callback(length !== 1);
      }
    });

    OLCS.eventEmitter.on("update:" + container , function() {
      buttonHandler.check();
    });
  };

}(document, window.jQuery));
