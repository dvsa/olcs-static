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

  return function init() {

    var tableRowSelector = 'tbody tr';
    var actionSelector   = 'a, input[type=submit]';
    var selectBox        = 'input[type=checkbox], input[type=radio]';

    // Get all the actions from a specified element
    function getActions(selector) {
      return $(selector).find(actionSelector);
    }

    // Check the row for a single action to see if it
    // should be made hoverable
    function checkForSingleAction(selector) {
      if (!$(selector).hasClass('disabled')) {
        return getActions(selector).length === 1;
      }
    }

    // On click of a table row
    $(document).on('click', tableRowSelector, function(e) {
      
      var target          = $(e.target);
      var actionElement   = getActions(this);
      var targetSelectBox = target.children(selectBox);

      // If the target element contains a select box, simulate a 
      // click of it's select box
      if (targetSelectBox.length) {
        targetSelectBox.click();
        return;
      }

      // Return if the row shouldn't be hoverable 
      if (!checkForSingleAction(this)) {
        return;
      }

      // If the target element isn't a select box or and doesn't contain one
      // simulate a click of the row's primary action 
      if (!target.is(selectBox) && !targetSelectBox.length) {
        actionElement.get(0).click();
      }

    });

    // On hover of a table row
    $(document).on('mouseenter mouseleave', tableRowSelector, function(e) {

      // If the row shouldn't be hoverable, return
      if (!checkForSingleAction(this)) {
        return;
      }

      // Toggle the class 'hover' on the table row
      if (e.type === 'mouseenter') {
        $(this).addClass('hover');
      } else if (e.type === 'mouseleave'){
        $(this).removeClass('hover');
      }

    });

  };

}(document, window.jQuery));
