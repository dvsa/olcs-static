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

    return $.ajax({
      url: form.attr("action"),
      method: form.attr("method"),
      data: form.serialize(),
      success: success,
      error: error
    });
  };

}(document, window.jQuery));
