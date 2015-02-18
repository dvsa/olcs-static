var OLCS = OLCS || {};

OLCS.multiFilter = (function(document, $, undefined) {

  "use strict";

  return function init(options) {

    var cachedOptions = {};

    /**
     * unfortunately we can't avoid having to loop over our
     * destination element since we assume it contains *all*
     * possible options on load. We need a copy of them
     * because we'll selectively remove/add them back in based
     * on interaction with options.from
     */
    $(options.to).find("option").each(function(_, v) {
      var option = $(v);
      var group  = option.parent().prop("label");

      if (!cachedOptions[group]) {
        cachedOptions[group] = [];
      }

      /**
       * build up an object keyed by the containing optgroup
       * we need each element per group to be an object as we
       * use both keys and values later
       */
      cachedOptions[group].push({
        text: option.text(),
        value: option.val()
      });
    });

    function setup() {
      /**
       * we'll have an array of strings after this with the
       * contents of each option's text. We have to use this
       * awkward loop here because $.val() would give us an
       * array of values which are effectively keys (IDs etc).
       * They're no use because our optgroups are assumed to be
       * grouped by "label", e.g. text value
       */
      var available = [];
      $(options.from).find(":selected").each(function(_, v) {
        available.push($(v).text());
      });

      // take a record of our destination's current values; used
      // later so we can make sure any which are still left after
      // re-populating the select are still selected
      var current = $(options.to).val() || [];

      // iterate over the available opt groups and render
      // the appropriate set of options
      var groupStr = $.map(available, function(v) {
        return renderOptGroup(v, current);
      });

      // completely replace the destination's groups and options
      // and make sure chosen knows about it (if it cares)
      $(options.to).html(groupStr).trigger("chosen:updated");
    }

    /**
     * Helper to render a single <optgroup> and all child <option> elems
     */
    function renderOptGroup(label, current) {
      var opts = cachedOptions[label];
      var optStr = "";

      for (var i = 0, j = opts.length; i < j; i++) {
        var option = opts[i];
        var attrs;

        // make sure we preserve any selected values which are still valid
        // @NOTE: we can't use current.indexOf() - IE8 doesn't support it
        if ($.inArray(option.value, current) !== -1) {
          attrs = " selected=''";
        } else {
          attrs = "";
        }
        optStr += "<option value='" + option.value + "'" + attrs + ">" + option.text + "</option>";
      }

      return "<optgroup label='" + label + "'>" + optStr + "</optgroup>";
    }

    setup();

    $(document).on("change", options.from, setup);
  };

}(document, window.jQuery));
