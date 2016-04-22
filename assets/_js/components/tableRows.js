var OLCS = OLCS || {};

/**
 * Table rows
 *
 * Makes table rows with a single anchor link or
 * input[type=submit] more clickable
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
    
    var lastChecked;

    // On click of a table row
    $(document).on('click', tableRowSelector, function(e) {
      
      var target          = $(e.target);
      var actionElement   = getActions(this);
      var targetSelectBox = target.children(selectBox);

      if (target.is(actionElement)) {
        return;
      }
      
      // allow multiple rows to be selected by using the 'shift' key
      if ($(this).find('[type="checkbox"]').length) {
      
        if(!lastChecked) {
          lastChecked = this;
          return;
        }
        
        // if the row was clicked whilst holding the 'shift' key
        if (e.shiftKey) {
          
          var start = $(tableRowSelector).index(this);
          var end = $(tableRowSelector).index(lastChecked);

          $(tableRowSelector)
            .slice(Math.min(start,end), Math.max(start,end) + 1)
            .find('[type="checkbox"]')
            .trigger('click');
          
          // add a class to prevent accidental text highlighting when clicking row
          $(this).parents('table').addClass('table--no-select');
          
          // toggle the checkbox
          //$(this).find('[type="checkbox"]').trigger('click');
          
          // toggle the row selected class
          $(this).toggleClass('checked');
          
          return;
        }
      
        lastChecked = this;
      }

      // If the target element contains a select box, simulate a
      // click of its select box
      if (targetSelectBox.length) {
        return targetSelectBox
          .click()   // select the input
          .change(); // make sure the change event is emitted properly
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
      } else if (e.type === 'mouseleave') {
        $(this).removeClass('hover');
      }

    });

  };

}(document, window.jQuery));
