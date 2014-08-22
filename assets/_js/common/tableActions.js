var OLCS = OLCS || {};

OLCS.tableActions = (function(document, $, undefined) {

  "use strict";

  return function init(options) {
    // @TODO can this just be wrapped up inside the existing
    // OLCS.formHandler component? Why can't it detect any
    // action clicks and submit the relevant form if it
    // needs to?
    // Would need to change to allow an optional callback
    // instead of options.container but shouldn't be
    //  a problem...
    $(document).on("click", options.selector, function(e) {
      e.preventDefault();

      var form = $(this).parents("form");
      var actionValue = $(this).val();

      form.prepend("<input type=hidden name=action value='" + actionValue + "' />");

      // submit the *table* form
      OLCS.formAjax(form, function(data) {
        OLCS.modal.show(data, actionValue);

        // @NOTE this only works once as the formHandler
        // binds a reference to the form on initialisation.
        // As such, when it gets replaced by the result from
        // the response, the variable refers to the old form
        // (I think...)
        //
        // @TODO this inner form might be the result of a
        // direct response (with errors) or a PRG
        // (i.e a success). We need to detect the latter...
        OLCS.formHandler({
          form: ".modal__content form",
          container: ".modal__content",
          onChange: false
        });
      });
    });
  };

}(document, window.jQuery));
