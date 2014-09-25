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

    // we might have more than one submit button in form so
    // we need to send button name to the server
    // @TODO this needs removing; formAjax shouldn't care about injecting
    // arbitrary form data - it should already be there if it needs to be
    var buttonClicked = $("button[type=submit][clicked=true]").attr('name');
    if (buttonClicked != undefined) {
        data += '&buttonClicked=' + buttonClicked;
    }

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
