var OLCS = OLCS || {};

/**
 * Postcode Search
 */

OLCS.postcodeSearch = (function(document, $, undefined) {

  "use strict";

  return function init(options) {
    var container = options.container;

    /**
     * store a list of fields considered to make up the
     * 'address' part of a postcode component
     */
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

    var inputSelector  = container + " .js-input";
    var submitSelector = container + " button";
    var selectSelector = container + " " + selectClass;

    var F = OLCS.formHelper;

    /**
     * Does the component contain any data or errors?
     */
    function isClean(component) {
      var group = $(component).data("group");

      for (var i = 0, j = fields.length; i < j; i++) {
        var input = F(group, fields[i]);
        if (input.attr("type") !== "text") {
          continue;
        }

        if (input.val() !== "") {
          return false;
        }
      }

      return $(component).children(".validation-wrapper").length === 0;
    }

    /**
     * Is the component currently in its interim state of showing the
     * user a list of matching addresses?
     */
    function inProgress(component) {
      return $(component).find(selectClass).length > 0;
    }

    /**
     * Handle either the click of the 'find' button or the change
     * of the 'select' input; either way, we perform the same action
     */
    function handleInput(selector) {
      return function(e) {
        e.preventDefault();

        var fieldset = $(this).parents(container);
        var button   = fieldset.find(selector);
        var form     = fieldset.parents("form");

        // ensure the backend knows which button was pressed
        F.pressButton(form, button);

        OLCS.formAjax({
          form: form,
          success: OLCS.normaliseResponse(function(response) {
            F.render(".js-body", response.body);
          })
        });
      };
    }

    /**
     * Simple method to iterate through all address components on the page
     * and initialise their state. We call this on initialisation and on
     * each render to keep things in sync
     */
    function setup() {
      $(container).each(function(i, component) {
        // we hide all address fields if a search is in progress or the
        // address data is currently empty and valid
        if (inProgress(component) || isClean(component)) {
          // this selector looks a bit loose but it works fine; we use children
          // rather than find which is equivalent to foo > bar.
          $(component).children(".field").hide();
        } else {
          // otherwise we hide the 'enter address manually' button
          $(component).find(".hint--small").hide();
        }
      });
    }

    /**
     * Ensure any time the page is re-rendered we resolve our components' state
     * properly
     */
    OLCS.eventEmitter.on("render", setup);

    // when we click 'find'...
    $(document).on("click", submitSelector, handleInput(".js-find"));

    // or we hit enter within the postcode input...
    $(document).on("keypress", inputSelector, function(e) {
      // keyCode is normalised; 13 is always enter
      if (e.keyCode === 13) {
        // we need .call here because it relies on 'this' for context
        handleInput(".js-find").call(this, e);
      }
    });

    // when we select an address from the dropdown...
    $(document).on("change", selectSelector, handleInput(".js-select"));

    // when we click the 'enter address manualy' button...
    $(document).on("click", ".hint--small a", function(e) {
      e.preventDefault();

      var fieldset = $(this).parents(container);

      // we have to show our pristine address fields
      var inputs = fieldset.children(".field");
      inputs.find("[type=text]").val("");
      inputs.show();
      // ditch the address options, if present...
      fieldset.find(selectClass).remove();
      // and finally, remove this button
      $(this).remove();
    });

    /**
     * Everything's in place and our listeners are ready; go!
     */
    setup();
  };

}(document, window.jQuery));
