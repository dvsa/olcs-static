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
    var actionSelector  = ".actions-container button";

    function checkButton(context) {
      var button;
      var checkedInputs;

      button = $(context).find(actionSelector).filter("[value='" + label + "']");

      if (button.length) {
        checkedInputs = $(context).find(checkedSelector);

        predicate(checkedInputs.length, function(disabled) {
          if (disabled) {
            button.attr("disabled", true);
          } else {
            button.removeAttr("disabled");
          }
        });
      }
    }

    $(document).on("change", selector, function() {
      checkButton(this);
    });

    function checkAll() {
      $(selector).change();
    }

    checkAll();

    return {
      check: checkAll
    };
  };

}(document, window.jQuery));
