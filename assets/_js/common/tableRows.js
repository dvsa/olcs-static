var OLCS = OLCS || {};

/**
 * OLCS.tableRows
 *
 * Makes the entire <tr> clickable when it has a
 * anchor link in one of it's <td>s
 */

OLCS.tableRows = (function(document, $, undefined) {

  'use strict';

  return function init(options) {

    var actionSelector = 'tbody tr';
    var targetElements = 'a, input[type=submit]';
    var exceptionElements = ':checkbox, :radio';

    function isHoverableRow(element) {
      return getTargetElements(element).length === 1;
    }

    function getTargetElements(element) {
      return $(element).find(targetElements)
    }

    $(document).on('click', actionSelector, function(e) {  

      if (!isHoverableRow(this)) {
        return;
      }

      var targetElements = getTargetElements(this);
      
      if (!$(e.target).is(exceptionElements)) {
        targetElements.get(0).click();
      }

    });

    $(document).on('mouseenter mouseleave', actionSelector, function(e) {
      
      if (!isHoverableRow(this)) {
        return;
      }

      if (e.type == "mouseenter") {
        $(this).addClass('hover');
      } else {
        $(this).removeClass('hover');
      }

    });

  };

}(document, window.jQuery));
