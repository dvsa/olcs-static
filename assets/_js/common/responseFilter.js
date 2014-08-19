var OLCS = OLCS || {};

OLCS.responseFilter = (function(document, $, undefined) {

  "use strict";

  return function init(filter, container) {
    return function(response) {
      if (filter) {
        response = $(response)
          .find(filter)
          .html();
      }

      $(container).html(response);
    };
  };

}(document, window.jQuery));
