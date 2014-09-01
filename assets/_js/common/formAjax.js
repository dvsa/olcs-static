var OLCS = OLCS || {};

/**
 * Tiny wrapper to submit a form via AJAX. Ensures
 * that the ajax submission matches the form's method
 * and action etc
 *
 */

OLCS.formAjax = (function(document, $, undefined) {

  "use strict";

  return function submit(options) {
    var form = options.form;
    var success = options.success;
    var error = options.error || function(/*jqXHR, status, err*/) {
      // no-op
    };
    var disableOnSubmit = options.disable !== undefined ? options.disable : true;

    // cache the form data before we disable it, otherwise
    // we'll serialize nothing
    var data = form.serialize();

    if (disableOnSubmit) {
      form.find(":input").attr("disabled", true);
    }

    function complete() {
      if (disableOnSubmit) {
        form.find(":input").removeAttr("disabled");
      }

      if (options.complete) {
        options.complete();
      }
    }

    return $.ajax({
      url: form.attr("action"),
      method: form.attr("method"),
      data: data,
      success: success,
      error: error,
      complete: complete
    });
  };

}(document, window.jQuery));
