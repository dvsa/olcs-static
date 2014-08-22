var OLCS = OLCS || {};

/**
 * Form Handler
 *
 * A simple component to handle form submissions and
 * make them asynchronous
 */

/*
OLCS.formHandler({
  form: "#my-form",
  hideSubmit: true,
  container: ".my-container",
  filter: ".my-selector"
});
*/

OLCS.formHandler = (function(document, $, undefined) {

  "use strict";

  return function init(options) {
    var form = $(options.form);
    var onChange = options.onChange !== undefined ? options.onChange : function() {
      form.submit();
    };
    var submitButton = options.submit || form.find("[type=submit]");

    if (options.hideSubmit) {
      $(submitButton).hide();
    }

    if (onChange) {
      $(document).on("change", options.form, onChange.bind(form));
    }

    $(document).on("submit", options.form, function(e) {
      e.preventDefault();

      OLCS.formAjax(form, OLCS.responseFilter(options.filter, options.container));
    });
  };

}(document, window.jQuery));
