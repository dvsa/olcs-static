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
    var actionSelector = selector + " " + "button[type=submit]";

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

    $(document).on("click", actionSelector, function(e) {

      var form = $(selector);
      var actionValue = $(this).val();
      var actionName  = $(this).attr("name");

      // @TODO de-dup with tableHandler
      // perhaps F.pressButton(form, this); ?
      form.find(".form__action").remove();
      form.prepend("<input class=form__action type=hidden name='" + actionName + "' />");
      form.find(".form__action").val(actionValue);

      // don't interfere with a normal submit on a multipart form
      // @TODO neater way of getting action name
      // perhaps F.buttonPressed(form, "string"); ?
      if (actionName.indexOf("[submit]") !== -1 && form.attr("enctype") === "multipart/form-data") {
        // remove the submit handler and let the click event happen normally
        $(document).off("submit", selector);
        return;
      }

      e.preventDefault();

      // make sure we don't try and submit cancel buttons
      if (actionName.indexOf("[cancel]") === -1) {
        form.submit();
      }
    });

    $(document).on("submit", selector, function(e) {
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
