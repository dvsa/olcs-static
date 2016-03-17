var OLCS = OLCS || {};

/**
 * OLCS.addAnother
 *
 * Duplicates the last field in a fieldset, increments
 * the name and ID if needed and appends it to the end
 * of the fieldset.
 */

OLCS.addAnother = (function(document, $, undefined) {

  "use strict";

  var triggerSelector = ".hint input[type=submit]";
  var targetSelector  = ".field:last";

  return function init() {

    function cloneLastField(fieldset) {
      var lastField = fieldset.find(targetSelector).clone();
      return lastField;
    }

    function incrementString(string) {
      var newString = string.replace(/\[(\d+)\]/, function(match, number) {
        return "[" + (parseInt(number, 10) + 1) + "]";
      });
      return newString;
    }

    function updateValues(element) {
      var field     = $(element);
      var input     = field.find("input");
      var inputName = incrementString(input.attr("name"));
      var inputID   = incrementString(input.attr("id"));

      input.attr({
        name: inputName,
        id: inputID,
      }).val("");

      return field;
    }

    $("body").on("click", triggerSelector, function(e) {
      e.preventDefault();
      var fieldset  = $(e.target).closest(".add-another");
      var lastField = cloneLastField(fieldset);
      var newField  = updateValues(lastField);
      $(newField).insertBefore(fieldset.find(".hint"));
    });

  };

}(document, window.jQuery));
