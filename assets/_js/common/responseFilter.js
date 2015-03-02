var OLCS = OLCS || {};

OLCS.responseFilter = (function(document, $, undefined) {

  "use strict";

  return function init(filter, container) {
    return OLCS.normaliseResponse(function(response) {
      var content = response.body;

      var filtered = $(content)
        .find(filter)
        .html();

      if (filtered) {
        content = filtered;
      }

      OLCS.formHelper.render(container, content);
    });
  };

}(document, window.jQuery));
