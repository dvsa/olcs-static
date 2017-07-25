var OLCS = OLCS || {};


OLCS.showPreloader = (function(document, $, undefined) {

  "use strict";

  var exports = {};

  exports.initialize = function() {
    var $elements = $("[data-show-preloader]");
    $elements.click(function(){
        var preloaderType = $(this).data("showPreloader");
        OLCS.preloader.show(preloaderType);
    });
  };

  return exports;


}(document, window.jQuery));
