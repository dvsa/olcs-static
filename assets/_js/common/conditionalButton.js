var OLCS = OLCS || {};

/**
 * Conditional Button
 *
 */

OLCS.conditionalButton = (function(document, $, undefined) {

  "use strict";

  return function init(options) {
    var selector        = options.container || options.form;
    var label           = options.label;
    var predicate       = options.predicate;
    var checkedSelector = options.checkedSelector || "input[name!='checkall']:checked";

    var actionSelector = selector + " .actions-container button";

    function checkButton() {
      var editButton = $(actionSelector).filter("[value='" + label + "']");
      if (editButton.length) {
        var checkedInputs = $(selector).find(checkedSelector);

        predicate(checkedInputs.length, function(disabled) {
          if (disabled) {
            editButton.attr("disabled", true);
          } else {
            editButton.removeAttr("disabled");
          }
        });
      }
    }

    $(document).on("change", selector, checkButton);

    checkButton();

    return {
      check: checkButton
    };
  };

}(document, window.jQuery));
