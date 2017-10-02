var OLCS = OLCS || {};

OLCS.nextFocusableElement = (function (document, $, undefined) {

  "use strict";

  var focusableElements = "a:visible, input:visible, select:visible, textarea:visible, button:visible, body:visible, [tabindex]:not([tabindex^=\"-\"]):visible";

  return function getNext(element) {
      var next = $(element).next(focusableElements);
      if(!next.length) {
          next = $(element).parent().next().find(focusableElements).first();
      }
      if(!next.length) {
          next = OLCS.nextFocusableElement($(element).parent());
      }
      return next;
  };

}(document, window.jQuery));