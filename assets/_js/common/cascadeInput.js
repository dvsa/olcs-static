var OLCS = OLCS || {};

/**
 * Cascade Input
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
    var destination = $(options.dest);
    var trap = options.trap === undefined ? true : options.trap;
    var disableDestination = options.disableDestination === undefined ? true : options.disableDestination;
    var loadingText = options.loadingText || "Loading&hellip;";
    var process = options.process;

    // allow a quick shortcut; if the user passed in `url`, then
    // assume they want process to be a simple async GET
    if (options.url) {
      process = function(value, callback) {
        $.get(options.url + "/" + value, callback);
      };
    }

    if (!$.isFunction(process)) {
      throw new Error("Please provide a process option");
    }

    $(document).on("change", options.source, function(e) {
      e.preventDefault();

      // make sure the event doesn't bubble up if we've askesd for it to be
      // trapped. This is useful because it prevents more generic change
      // listeners (like say a form submit) from firing prematurely
      if (trap) {
        e.stopPropagation();
      }

      function done(result) {
        // @NOTE it's pretty obvious we're making three huge assumptions here:
        // 1) That we get an array of values & labels back
        // 2) We expect "options.dest" to be a select (because we build up
        // some options)
        // 3) We expect the first value, which will be selected, to be 'current'
        // As and when this component is expanded, obviously we'll need to change this!
        var str = "";
        for (var i = 0, j = result.length; i < j; i++) {
          var r = result[i];
          str += "<option value='" + r.value + "'>" + r.label + "</option>";
        }

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

      if (disableDestination) {
        destination.html("<option>" + loadingText + "</option>");
        destination.attr("disabled", true);
      }

      process.call(this, $(this).val(), done);
    });
  };

}(document, window.jQuery));
