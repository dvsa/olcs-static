var OLCS = OLCS || {};

/**
 * OLCS.cascadeForm
 *
 * This component should be bound to a form in which each section
 * (usually defined by a top-level fieldset) relates to the one which
 * follows it; that is the content of the following fieldset is affected
 * in some way by the input received in the current one.
 *
 * @FIXME: this component needs to use event delegation and stop caching
 * a reference to a form object.
 */

OLCS.cascadeForm = (function(document, $, undefined) {

  "use strict";

  return function init(options) {
    var selector = options.form || "form";
    var form = $(selector);
    var previousFieldset;
    var cascade = options.cascade !== undefined ? options.cascade : true;
    var onSubmit = options.submit;
    var errorWrapper = options.errorWrapper || ".validation-wrapper";

    /**
     * by using a closure we ensure this function is safe
     * to bind inside loops etc
     */
    function clearFieldset(target) {
      /**
       * the actual event handler simply finds all inputs in the
       * target fieldset and clears them out
       *
       * @TODO only checkboxes and radios are supported at the moment, easy to
       * change though
       */
      return function clear() {
        var elems = $(target).find(":input");
        $.each(elems, function(i, elem) {
          elem = $(elem);
          if (elem.is(":checked")) {
            elem.removeAttr("checked");
          }
        });
        // ensure the change notification cascades down the line
        $(target).trigger("change");
      };
    }

    /**
     * Iterate over the form, checking the relevant rulesets.
     *
     * We generally expect each ruleset to apply to a fieldset
     * but allow for exceptions. Once we've found a fieldset or
     * element, we invoke its predicate which can either be a
     * bool or function
     */
    function checkForm() {
      for (var fieldset in options.rulesets) {
        var ruleset = options.rulesets[fieldset];

        // if the rule value is a string or a function then assume
        // it applies to the fieldset as a whole
        if (!$.isPlainObject(ruleset)) {
          triggerRule(fieldset, "*", ruleset);
          continue;
        }

        // if the value was an object, iterate its key/vals and trigger
        // a rule on each of them, bound to the outer fieldset
        for (var selector in ruleset) {
          var rule = ruleset[selector];
          triggerRule(fieldset, selector, rule);
        }
      }
    }

    /**
     * invoke a rule against an element or fieldset. The
     * end result will be the showing or hiding of the
     * relevant element
     *
     * Usually traverses up the DOM tree to see if the matched container
     * itself sits within an error message and treats that as the parent
     * if so; although currently there are exceptions to this
     */
    function triggerRule(group, selector, rule) {
      var show;
      var elem;
      var action = "none";

      if ($.isFunction(rule)) {
        show = rule.call(form);
      } else {
        show = rule;
      }

      elem = findContainer(group, selector);

      // are we currently sat inside a validation error wrapper? If
      // so that becomes the top-level element
      // note that key=val selectors are an exception to this rule
      // and as such we never check their containers
      if (selector.search("=") === -1 && elem.parents(errorWrapper).length) {
        elem = elem.parents(errorWrapper);
      }

      if (show && elem.is(":hidden")) {
        action = "show";
      } else if (!show && elem.is(":visible")) {
        action = "hide";
      }
      OLCS.logger.verbose(
        group + " > " + selector +
          ", should show? (" + show + "), is visible? (" +
          elem.is(":visible") + "), action: (" +
          action + ")",
        "cascadeForm"
      );

      if (action !== "none") {
        elem[action]();
        OLCS.eventEmitter.emit(action + ":" + group + ":" + selector);
      }
    }

    /**
     * find a container or element based on a group (i.e. a fieldset)
     * and selector. Takes a special asterisk(*) argument to represent
     * the group itself rather than a child
     */
    function findContainer(group, selector) {
      if (selector === "*") {
        return OLCS.formHelper(group);
      }

      var parts;

      // shorthands for ID and class selectors
      if (selector.substring(0, 1) === "#" || selector.substring(0, 1) === ".") {
        selector = "selector:" + selector;
      }

      if (selector.search(":") !== -1) {

        parts = selector.split(":");

        switch (parts[0]) {
          case "label":
            // @NOTE: we make some assumptions about the markup surrounding labels
            // feel free to update as and when
            return form.find("label[for=" + parts[1] + "]").parents(".field");
          case "selector":
            return form.find(parts[1]);
          case "date":
            return form.find("[name*=" + parts[1] + "]").parents(".field");
          case "parent":
            return form.find(parts[1]).parent();
          default:
            throw new Error("Unsupported left-hand selector: " + parts[0]);
        }
      }

      if (selector.search("=") !== -1) {

        // assume a name=value pair specifies a radio button with a given value
        parts = selector.split("=");

        // @TODO `group` isn't always right here; it can be an arbitrary selector
        // not just a data-group=xxx name. This needs fixing at some point
        return OLCS.formHelper.findInput(group, parts[0])
        .filter("[value=" + parts[1] + "]")
        // radios are always wrapped inside a label
        .parents("label:last");

      }

      // otherwise assume a straight input name which we assume is inside a field container
      return OLCS.formHelper(group, selector).parents(".field");

    }

    /*
     * first things first, find the top-level fieldsets and bind some
     * handlers such that when they change, the event cascades to
     * all subsequent fieldsets emptying them out
     */
    if (cascade) {
      for (var fieldset in options.rulesets) {
        var current = findContainer(fieldset, "*");
        if (previousFieldset) {
          $(previousFieldset).on(
            "change",
            clearFieldset(current)
          );
        }
        previousFieldset = current;
      }
    }

    if (onSubmit) {
      // we'd like to use bind, but IE8 won't let us
      form.on("submit", function(e) {
        onSubmit.call(form, e);
      });
    }

    form.on("change", checkForm);

    OLCS.eventEmitter.on("render", checkForm);
  };

}(document, window.jQuery));
