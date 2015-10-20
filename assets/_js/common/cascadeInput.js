var OLCS = OLCS || {};

/**
 * OLCS.cascadeInput
 *
 * Given a source and destination input, and a process callback
 * invoked when the source value changes, apply those changes
 * to the destination input.
 *
 * Currently assumes destination is a select (which obviously
 * won't be true once this component is adopted a bit more).
 */

OLCS.cascadeInput = (function(document, $, undefined) {

  "use strict";

  return function init(options) {
    var trap = options.trap === undefined ? true : options.trap;
    var disableDestination = options.disableDestination === undefined ? true : options.disableDestination;
    var loadingText = options.loadingText || "Loading&hellip;";
    var emptyLabel = options.emptyLabel || null;
    var process = options.process;
    var clearWhenEmpty = options.clearWhenEmpty || false;

    // allow a quick shortcut; if the user passed in `url`, then
    // assume they want process to be a simple async GET
    if (options.url) {
      process = function(value, callback) {

        // @NOTE this is an assumption which is valid for now but might
        // not always be so feel free to change it. Essentially if the
        // component asks to clear the select values when the empty value is
        // chosen we short-circuit the AJAX request and invoke the callback
        // with one empty value instead
        if (value === "" && clearWhenEmpty) {
          return callback([{value: ""}]);
        }

        OLCS.ajax({
          url: options.url + "/" + value,
          success: callback
        });
      };
    }

    if (!$.isFunction(process)) {
      throw new Error("Please provide a 'process' function or 'url' string");
    }

    $(document).on("change", options.source, function(e) {
      var destination = $(options.dest);
      e.preventDefault();

      // make sure the event doesn't bubble up if we've askesd for it to be
      // trapped. This is useful because it prevents more generic change
      // listeners (like say a form submit) from firing prematurely
      if (trap) {
        e.stopPropagation();
      }

      function done(result) {

        if (destination.attr("type") === "text") {

          if (result.value) {
            destination.val(result.value);
          }

        } else {

          // @NOTE it's pretty obvious we're making three huge assumptions here:
          // 1) That we get an array of values & labels back
          // 2) We expect "options.dest" to be a select (because we build up
          // some options)
          // 3) We expect the first value, which will be selected, to be 'current'
          // As and when this component is expanded, obviously we'll need to change this!
          var str = "";
          $.each(result, function(i, r) {
            if (r.value === "" && emptyLabel) {
              r.label = emptyLabel;
            }
            str += "<option value='" + r.value + "'>" + r.label + "</option>";
          });

          destination.html(str);

          if (disableDestination) {
            destination.removeAttr("disabled");
          }

          // we assume that if we trapped the earlier change event, we want to
          // trigger one now. Note that the event is triggered on a different element
          // (dest rather than src); if this matters by all means tweak the component
          if (trap) {
            destination.change();
          }
        }
      }

      if (disableDestination) {
        destination.html("<option>" + loadingText + "</option>");
        destination.attr("disabled", true);
      }

      process.call(this, $(this).val(), done);
    });
  };

}(document, window.jQuery));
