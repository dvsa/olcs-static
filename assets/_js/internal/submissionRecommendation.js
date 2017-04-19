/**
 * 1) Defensively declare our project-level namespace
 */
var OLCS = OLCS || {};

/**
 * 2) Attach our component to our namespace using an
 * IIFE (Immediately Invoked Function Expression).
 *
 * Doing so means that everything within the function
 * has its own scope; this leaves it up to us what we
 * expose as the component's public interface.
 *
 * Use camelCase to name your component, and unless
 * you have a good reason not to, leave the arguments
 * as follows:
 *
 * document - this injects the global document variable locally,
 * meaning we avoid a scope lookup when accessing it within
 * the component
 *
 * $ - the jQuery variable, again scoped locally
 *
 * undefined - an edge case, but this prevents accidental reassignment
 * of what undefined represents and means you can test against it
 * directly
 */
OLCS.submissionRecommendation = (function(document, $, undefined) {
  "use strict";

  var exports = {};

  exports.addChangeEvent = function(options) {
    $(options.source).on("change", function() {
      exports.changeEvent.call(this,options);
    });
  };


  exports.changeEvent = function(options){

    var original = $(options.dest).clone();
    var subset   = original.clone();
    subset.find("[data-in-office-revokation=N]").remove();

    var contents;
    var recommendations = $(this).val();

    if (recommendations && recommendations.indexOf(options.target) >= 0) {
      contents = subset.html();
    } else {
      contents = original.html();
    }

    $(options.dest).html(contents).trigger("chosen:updated");
  };


  return exports;

}(document, window.jQuery));
