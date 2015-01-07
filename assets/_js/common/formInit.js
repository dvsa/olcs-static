var OLCS = OLCS || {};

OLCS.formInit = (function(document, $, undefined) {

  "use strict";

  return function init() {
    /*
     * always append a hidden element to all forms so we know they were submitted
     * with a JS enabled browser. The backend can then optionally look for this
     * known value and potentially react accordingly
     */
    $("form").append("<input type='hidden' name='js-submit' value='1' />");

    // initialise Chosen
    $(".chosen-select-medium").chosen({width: "53%"});
    $(".chosen-select-large").chosen({width: "97%"});
  };

}(document, window.jQuery));
