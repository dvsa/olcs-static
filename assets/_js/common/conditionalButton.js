var OLCS = OLCS || {};

/**
 * Conditional Button
 *
 */

OLCS.conditionalButton = (function(document, $, undefined) {

  "use strict";

  return function init(options) {
    var selector;
    var filter;

    if (options.label && options.selector) {
      throw new Error("'label' and 'selector' are mutually exclusive");
    }

    selector = options.container || options.form;

    if (options.label) {
      filter = "[value='" + options.label + "']";
    } else {
      filter = options.selector;
    }

    var predicate       = options.predicate;
    var checkedSelector = options.checkedSelector || "input[name!='checkall']:checked";
    var actionSelector  = ".actions-container button";

    function checkButton(context) {
      var button;
      var checkedInputs;

      button = $(context).find(actionSelector).filter(filter);

      if (button.length) {
        checkedInputs = $(context).find(checkedSelector);

        predicate(checkedInputs.length, function(disabled) {
          if (disabled) {
            button.attr("disabled", true);
          } else {
            button.removeAttr("disabled");
          }
        }, checkedInputs);
      }
    }

    $(document).on("change", selector, function() {
      checkButton(this);
    });

    function setup() {
      $(selector).change();
    }

    /**
     * Make sure any time the parent page is re-rendered we give our conditional buttons a kick
     */
    OLCS.eventEmitter.on("render", setup);

    setup();
  };

}(document, window.jQuery));
