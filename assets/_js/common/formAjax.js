var OLCS = OLCS || {};

/**
 * Tiny wrapper to submit a form via AJAX. Ensures
 * that the ajax submission matches the form's method
 * and action etc
 *
 */

OLCS.formAjax = (function(document, $, undefined) {

  "use strict";

  return function submit(form, success, error) {
    error = error || function(/*jqXHR, status, err*/) {
      // no-op
    };

    // cache the form data before we disable it, otherwise
    // we'll serialize nothing
    var data = form.serialize();

    // @TODO: make this an input param
    form.find(":input").attr("disabled", true);
    // @TODO and this too
    function complete() {
      form.find(":input").removeAttr("disabled");
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
