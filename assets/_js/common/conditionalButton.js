var OLCS = OLCS || {};

/**
 * Conditional Button
 *
 */

OLCS.conditionalButton = (function(document, $, undefined) {

  "use strict";

  return function init(options) {
    var selector = options.form;
    var label    = options.label;

    var actionSelector = selector + " .table__header [name=action]";

    function checkButton() {
      var editButton = $(actionSelector).filter("[value='" + label + "']");
      if (editButton.length) {
        var checkedInputs = $(selector).find(":checked");

        // @TODO respect the predicate method!!
        if (checkedInputs.length !== 1) {
          editButton.attr("disabled", true);
        } else {
          editButton.removeAttr("disabled");
        }
      }
    }

    $(document).on("change", selector, checkButton);

    checkButton();

    return {
      check: checkButton
    };
  };

}(document, window.jQuery));
