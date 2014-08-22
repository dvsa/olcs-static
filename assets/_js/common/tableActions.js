var OLCS = OLCS || {};

OLCS.tableActions = (function(document, $, undefined) {

  "use strict";

  return function init(options) {
    $(document).on("click", options.selector, function(e) {
      e.preventDefault();

      var form = $(this).parents("form");
      var actionValue = $(this).val();
      form.prepend("<input type=hidden name=action value='" + actionValue + "' />");

      OLCS.formAjax(form, function(data) {
        OLCS.modal.show(data, actionValue);
      });
    });
  };

}(document, window.jQuery));
