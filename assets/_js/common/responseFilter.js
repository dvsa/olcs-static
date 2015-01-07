var OLCS = OLCS || {};

OLCS.responseFilter = (function(document, $, undefined) {

  "use strict";

  return function init(filter, container) {
    return OLCS.normaliseResponse(function(response) {
      var content = response.body;

      if (filter) {
        var filtered = $(content)
          .find(filter)
          .html();

        if (filtered) {
          content = filtered;
        }
      }

      $(container).html(content);
    });
  };

}(document, window.jQuery));
