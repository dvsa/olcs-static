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
    var selector = options.form;
    var onChange = options.onChange !== undefined ? options.onChange : function() {
      $(this).submit();
    };
    var submitButton = options.submit || $(selector).find("[type=submit]");

    var handler = {
      unbind: function() {
        $(document).off("submit", selector);
        if (onChange) {
          $(document).off("change", selector);
        }
      }
    };

    if (options.hideSubmit) {
      $(submitButton).hide();
    }

    if (onChange) {
      $(document).on("change", selector, function(e) {
        var form = $(selector);
        onChange.call(form, e);
      });
    }

    $(document).on("submit", selector, function(e) {
      if ($(this).attr("enctype") === "multipart/form-data") {
        return;
      }
      e.preventDefault();

      var form = $(selector);

      OLCS.formAjax({
        form: form,
        success: OLCS.responseFilter(options.filter, options.container),
        complete: function() {
          OLCS.eventEmitter.emit("update:" + options.container);
        }
      });

    });

    return handler;
  };

}(document, window.jQuery));
