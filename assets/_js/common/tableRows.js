var OLCS = OLCS || {};

/**
 * OLCS.tableRows
 *
 * Makes table rows with a single anchor link or 
 * input[type=submit] more clickable
 *
 */

OLCS.tableRows = (function(document, $, undefined) {

  'use strict';

  return function init(options) {

    var tableRowSelector   = 'tbody tr';
    var actionSelector     = 'a, input[type=submit]';
    var otherInputSelector = ':checkbox, :radio';

    // Get all the actions from a specified element
    function getActions(selector) {
        return $(selector).find(actionSelector);
    }

    // Check the row for a single action to see if it
    // should be made hoverable
    function hoverableRow(selector) {
      if (!$(selector).hasClass('disabled')) {
        return getActions(selector).length === 1;
      }
    }

    // On click of a table row
    $(document).on('click', tableRowSelector, function(e) {  

      // If the row shouldn't be hoverable, return
      if (!hoverableRow(this)) {
        return;
      }

      // Cache the clicked table row's action
      var $actionElement = getActions(this);
      
      // Providing the target of our click isn't one of the
      // row's checkbox or radios, we trigger a click of the 
      // row's primary action
      if (!$(e.target).is(otherInputSelector)) {
        $actionElement.get(0).click();
      }

    });

    // On hover of a table row
    $(document).on('mouseenter mouseleave', tableRowSelector, function(e) {
      
      // If the row shouldn't be hoverable, return
      if (!hoverableRow(this)) {
        return;
      }

      // Toggle the class 'hover' on the table row
      if (e.type == "mouseenter") {
        $(this).addClass('hover');
      } else {
        $(this).removeClass('hover');
      }

    });

  };

}(document, window.jQuery));
