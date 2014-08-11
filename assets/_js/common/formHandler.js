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
    var onChange = options.onChange || function(e) {
      form.submit();
    };
    var submitButton = options.submit || form.find("[type=submit]");

    if (options.hideSubmit) {
      $(submitButton).hide();
    }

    form.on("change", onChange.bind(form));

    form.on("submit", function(e) {
      e.preventDefault();

      OLCS.formAjax(form, function(response) {
        if (options.filter) {
          response = $(response)
            .find(options.filter)
            .html()
        }

        $(options.container).html(response);
      });
    });
  };

}(document, window.jQuery));
