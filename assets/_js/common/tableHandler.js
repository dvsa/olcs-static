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

    var actionSelector = table + " .table__header [name=action], .table__empty button";

    var F = OLCS.formHelper;

    /**
     * Form action links
     */
    $(document).on("click", actionSelector, function(e) {
      e.preventDefault();

      var form   = $(this).parents("form");
      var button = $(this);

      // our backend logic relies on receiving the the value of the action
      // button which was clicked in order to determine what to do.
      // Unfortunately a JS click event + submit combo won't include
      // that info, so we have to manually inject it into the form
      F.pressButton(form, button);

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
  };

}(document, window.jQuery));
