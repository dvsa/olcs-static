var OLCS = OLCS || {};

OLCS.complexPredicate = (function(document, $, undefined) {

  "use strict";

  return function init(options) {
    if ($.isArray(options)) {
      options = {
        allow: options
      };
    }

    if (options.max === undefined) {
      options.max = Infinity;
    }

    if (options.attr === undefined) {
      options.attr = "action";
    }

    return function checkComplexPredicate(length, enable, selectedInputs) {

      if (length < 1 || length > options.max) {
        return enable(false);
      }

      var rows = $.map(selectedInputs, function(input) {
        return $(input).data(options.attr);
      });

      enable(
        // as long as we don't have any rows NOT in the allowed list; go for it
        $(rows).not(options.allow).length === 0
      );
    };
  };

}(document, window.jQuery));
