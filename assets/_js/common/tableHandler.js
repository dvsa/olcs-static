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
          // ... assume that the response we get back should be shown in
          // a modal
          OLCS.modal.show(data.body, data.title);

          // also assume that we've got a form within the rendered modal
          // and bind a form handler to it
          var handler = OLCS.formHandler({
            form: ".modal__content form",
            container: ".modal__content",
            onChange: false
          });

          // because handler uses event delegation, the listeners it sets
          // up will keep hanging around after the modal is closed, which
          // means if it's re-opened they'll rebind and trip each other up
          // As such, we need to manually unbind them each time.
          OLCS.eventEmitter.once("hide:modal", function() {
            handler.unbind();
          });
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
    var buttonHandler = OLCS.conditionalButton({
      form: ".table__form",
      label: "Edit",
      predicate: function(length) {
        return length !== 1;
      }
    });

    OLCS.eventEmitter.on("update:" + container , function() {
      buttonHandler.check();
    });
  };

}(document, window.jQuery));
