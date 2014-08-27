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

  function Handler(selector, onChange) {
    this.selector = selector;
    this.onChange = onChange;
  }

  Handler.prototype.off = function() {
    $(document).off("submit", this.selector);
    if (this.onChange) {
      $(document).off("change", this.selector);
    }
  };

  return function init(options) {
    var selector = options.form;
    var onChange = options.onChange !== undefined ? options.onChange : function() {
      $(this).submit();
    };
    var submitButton = options.submit || $(selector).find("[type=submit]");

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
      e.preventDefault();

      var form = $(selector);

      OLCS.formAjax({
        form: form,
        success: OLCS.responseFilter(options.filter, options.container)
      });
    });

    // @TODO validate, is this right?
    return new Handler(selector, onChange);
  };

}(document, window.jQuery));
