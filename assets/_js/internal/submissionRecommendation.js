var OLCS = OLCS || {};


OLCS.submissionRecommendation = (function(document, $, undefined) {
  "use strict";

  var exports = {};

  exports.addChangeEvent = function(options) {
    $(options.source).on("change", function() {
      exports.removeRevokations(options);
    });
  };

  // exports.setOriginalHTML = function(html){
  //   olcs.submissionRecommendation.originalHTML = html;
  // };

  // export.getOriginalHTML = function(){
  //   return this.originalHTML;
  // };

  exports.removeRevokations = function(options){


    var original = $(options.dest).clone();
    var subset   = original.clone();
    subset.find("[data-in-office-revokation=N]").remove();

    var contents;
    var recommendations = $(options.source)[0].value;

    if (recommendations && recommendations.indexOf(options.target) >= 0) {
      contents = subset.html();
    } else {
      contents = original.html();
    }

    $(options.dest).html(contents).trigger("chosen:updated");
  };

  return exports;

}(document, window.jQuery));
