var OLCS = OLCS || {};
/**
 * @FIXME: no longer table specific. All this really does is bind
 * a listener to the click event of several buttons
 *
 * Can either get rid or rename
 *
 * Either way, let's consolidate
 */

/**
 * Table Handler
 *
 * Binds listeners to intercept various link clicks (pagination,
 * sort ordering etc) and action button clicks.
 *
 * This makes various assumptions about what we expect back after
 * submitting a table form; as such this may need adapting in future.
 *
 * It's also a bit big compared to other components. It might make
 * sense to split this into smaller ones which this just opts into
 */

OLCS.formHandlerModal = (function(document, $, undefined) {

  "use strict";

  return function init(options) {
    var form = options.form;
    var bodySelector = options.bodySelector;
    var F = OLCS.formHelper;

    OLCS.formHandler({
      form: form,
      isModal: true,
      onChange: false,
      success: OLCS.normaliseResponse(function(data) {
        if (data.hasErrors && bodySelector) {
          F.render(bodySelector, data.body);
          return;
        }
        // assume that the the modal we get back has a form,
        // so invoke a wrapper component to bind a formHandler
        // and show the modal at the same time
        OLCS.formModal(data);
      })
    });
  };

}(document, window.jQuery));
