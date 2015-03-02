OLCS.ready(function() {
  "use strict";

  OLCS.conditionalButton({
    form: ".table__form",
    selector: ".js-require--one",
    predicate: function(length, callback) {
      callback(length !== 1);
    }
  });

  OLCS.conditionalButton({
    form: ".table__form",
    selector: ".js-require--multiple",
    predicate: function(length, callback) {
      callback(length < 1);
    }
  });

});
