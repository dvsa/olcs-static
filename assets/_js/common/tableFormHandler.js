var OLCS = OLCS || {};

OLCS.tableFormHandler = (function(document, $, undefined) {

  "use strict";

  return function init(options) { // @TODO can this just be wrapped up inside the existing // OLCS.formHandler component? Why can't it detect any
    // action clicks and submit the relevant form if it
    // needs to?
    // Would need to change to allow an optional callback
    // instead of options.container but shouldn't be
    //  a problem...
    $(document).on("click", options.selector, function(e) {
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

        OLCS.formHandler({
          form: ".modal__content form",
          container: ".modal__content",
          onChange: false
        });
      }));
    });
  };

}(document, window.jQuery));
