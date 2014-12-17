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
    var isModal = options.isModal || false;
    var success = options.success || OLCS.responseFilter(options.filter, options.container);

    var onChange = options.onChange !== undefined ? options.onChange : function() {
      $(this).submit();
    };
    var submitButton = options.submit || $(selector).find("[type=submit]");
    var actionSelector = selector + " button[type=submit]";

    // we'll return this so consumers can unbind listeners if they want to
    var handler = {
      unbind: function() {
        /**
         * @NOTE: it is crucial that *all* listeners are unbound here, so
         * when adding any `on` calls, make sure you add the
         * corresponding `off` too
         */
        $(document).off("submit", selector);

        $(document).off("click", actionSelector);

        if (onChange) {
          $(document).off("change", selector);
        }
      }
    };

    var F = OLCS.formHelper;

    if (options.hideSubmit) {
      $(submitButton).hide();
    }

    if (onChange) {
      $(document).on("change", selector, function(e) {
        var form = $(selector);
        onChange.call(form, e);
      });
    }

    /**
     * we need to hook into click events to make sure we set the
     * correct input name when submitting the form via AJAX. Normally
     * these don't get set, but some backend logic acts based on
     * which button was clicked
     */
    $(document).on("click", actionSelector, function(e) {

      var form   = $(selector);
      var button = $(this);

      F.pressButton(form, button);

      // don't interfere with a normal submit on a multipart form; remove
      // the submit handler and let the click event happen normally
      if (F.buttonPressed(form, "[submit]") && form.attr("enctype") === "multipart/form-data") {
        handler.unbind();
        return;
      }

      e.preventDefault();

      // make sure we don't try and submit cancel buttons
      if (isModal && F.buttonPressed(form, "[cancel]")) {
        return;
      }

      form.submit();
    });

    /**
     * bind a simple submit handler to send the form via * AJAX
     */
    $(document).on("submit", selector, function(e) {
      e.preventDefault();

      var form = $(selector);

      OLCS.formAjax({
        form: form,
        success: success,
        complete: function() {
          OLCS.eventEmitter.emit("update:" + options.container);
        }
      });
    });

    // callers of this component might want to manually unbind the listeners
    // we've bound to it, so we need to return a wrapped object which lets
    // them do so
    return handler;
  };

}(document, window.jQuery));
