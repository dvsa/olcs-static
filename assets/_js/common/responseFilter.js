var OLCS = OLCS || {};

OLCS.responseFilter = (function(document, $, undefined) {

  "use strict";

  return function init(filter, container) {
    return OLCS.normaliseResponse(function(response) {
      var content = response.body;

      if (filter) {
        content = $(content)
          .find(filter)
          .html();
      }

      $(container).html(content);
    });
  };

}(document, window.jQuery));
