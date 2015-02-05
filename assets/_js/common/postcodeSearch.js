var OLCS = OLCS || {};

/**
 * Postcode Search
 */

OLCS.postcodeSearch = (function(document, $, undefined) {

  "use strict";

  return function init(options) {
    var container = options.container;

    var fields = options.fields || [
      "addressLine1",
      "addressLine2",
      "addressLine3",
      "addressLine4",
      "town",
      "postcode",
      "countryCode"
    ];

    var submitSelector = container + " button";
    var selectSelector = container + " select:first";

    var F = OLCS.formHelper;

    function hasData() {
      var group = $(container).data("group");

      for (var i = 0, j = fields.length; i < j; i++) {
        var input = F(group, fields[i]);
        if (input.attr("type") !== "text") {
          continue;
        }

        if (input.val() !== "") {
          return true;
        }
      }
      return false;
    }

    function handleClick(selector) {
      return function(e) {
        e.preventDefault();

        var fieldset = $(this).parents(container);
        var button   = fieldset.find(selector);
        var form     = fieldset.parents("form");

        F.pressButton(form, button);

        OLCS.formAjax({
          form: form,
          success: OLCS.normaliseResponse(function(response) {
            F.render(".js-body", response.body);
          })
        });
      };
    }

    $(document).on("click", submitSelector, handleClick(".js-find"));

    $(document).on("change", selectSelector, handleClick(".js-select"));

    $(document).on("click", ".hint--small a", function(e) {
      e.preventDefault();
      console.log("@TODO show all address inputs");
    });

    // @TODO: loop over *all* valid containers
    if (hasData()) {
      $(container).find(".hint--small").hide();
    } else {
      console.log("@TODO hide all inputs");
    }
  };

}(document, window.jQuery));
