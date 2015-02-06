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

    var selectClass = ".address__select";
    var submitSelector = container + " button";
    var selectSelector = container + " " + selectClass;

    var F = OLCS.formHelper;

    function hasData(elem) {
      var inputs = getInputs(elem);

      for (var i = 0, j = inputs.length; i < j; i++) {
        var input = inputs[i];
        if (input.attr("type") !== "text") {
          continue;
        }

        if (input.val() !== "") {
          return true;
        }
      }
      return false;
    }

    function inProgress(elem) {
      return $(elem).find(selectClass).length > 0;
    }

    function getInputs(elem) {
      var group = $(elem).data("group");

      var inputs = [];

      for (var i = 0, j = fields.length; i < j; i++) {
        inputs.push(F(group, fields[i]));
      }

      return inputs;
    }

    function submitForm(fieldset, selector) {
      var button = fieldset.find(selector);
      var form   = fieldset.parents("form");

      F.pressButton(form, button);

      OLCS.formAjax({
        form: form,
        success: OLCS.normaliseResponse(function(response) {
          F.render(".js-body", response.body);
        })
      });
    }

    function setup() {
      var elements = $(container);
      elements.each(function(i, elem) {
        if (inProgress(elem) || hasData(elem) === false) {
          $(elem).children(".field").hide();
        } else {
          $(elem).find(".hint--small").hide();
        }
      });
    }

    $(document).on("click", submitSelector, function(e) {
      e.preventDefault();

      var fieldset = $(this).parents(container);

      submitForm(fieldset, ".js-find");
    });

    $(document).on("change", selectSelector, function(e) {
      e.preventDefault();

      var fieldset = $(this).parents(container);

      submitForm(fieldset, ".js-select");
    });

    $(document).on("click", ".hint--small a", function(e) {
      e.preventDefault();

      var fieldset = $(this).parents(container);

      fieldset.children(".field").show();
      fieldset.find(selectClass).remove();
      $(this).remove();
    });

    setup();

    OLCS.eventEmitter.on("render", setup);
  };

}(document, window.jQuery));
