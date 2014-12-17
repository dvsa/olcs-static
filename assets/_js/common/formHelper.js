var OLCS = OLCS || {};

OLCS.formHelper = (function(document, $, undefined) {

  "use strict";

  /**
   * the class we apply to a hidden input used to
   * simulate which button was clicked when submitting
   * a form
   */
  var formClickAction = "form__action";

  /**
   * Expose a jQuery-esque function which tries to work
   * out which actual public property to invoke purely
   * based off argument length. Pretty crude, but a
   * handy shorthand
   */
  var exports = function() {
    switch (arguments.length) {
      case 1:
        return exports.fieldset.apply(null, arguments);
      case 2:
        return exports.input.apply(null, arguments);
    }
  };

  /**
   * public interface
   */
  exports.fieldset = function(selector) {
    return $("html").find("fieldset[data-group='" + selector + "']");
  };

  exports.input = function(fieldset, name) {
    return $("html").find("[name=" + fieldset + "\\[" + name + "\\]]");
  };

  exports.findInput = function(fieldset, name) {
    return exports
    .fieldset(fieldset)
    .find("[name*=\\[" + name + "\\]]");
  };

  exports.pressButton = function(form, button) {
    var actionValue = button.val();
    var actionName  = button.attr("name");

    form.find("." + formClickAction).remove();
    form.prepend("<input class='" + formClickAction + "' type=hidden name='" + actionName + "' />");
    form.find("." + formClickAction).val(actionValue);
  };

  exports.buttonPressed = function(form, name) {
    var actionName = form.find("." + formClickAction).attr("name");
    return (typeof actionName === "string" && actionName.indexOf(name) !== -1);
  };

  exports.isChecked = function(fieldset, name, value) {
    if (value === undefined) {
      value = "Y";
    }

    return exports.input(fieldset, name)
    .filter(":checked")
    .val() === value;
  };

  exports.containsErrors = function(payload) {
    if (typeof payload === "string") {
      // assume the payload needs a container if it's just a string
      payload = $("<div>" + payload + "</div>");
    }

    return payload.find(".validation-summary").length > 0 ||
      payload.find(".validation-wrapper").length > 0;
  };

  exports.clearErrors = function(context) {
    $(".validation-summary", context).remove();
    $(".validation-wrapper ul:first", context).remove();
    $(".validation-wrapper", context).removeClass("validation-wrapper");
  };

  exports.render = function(container, body) {
    $(container).html(body);
    OLCS.eventEmitter.emit("render");
  };

  return exports;

}(document, window.jQuery));
