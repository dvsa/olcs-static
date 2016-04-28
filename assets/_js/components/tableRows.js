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
    
    function highlightRow(row) {
      row = row || $(event.target).parents('tr');
      // add the row selected class
      row.addClass('checked');
      // Check the checkbox
      row.find(selectBox).prop('checked', true).change();
    }
    
    function unHighlightRow(row) {
      row = row || $(event.target).parents('tr');
      // remove the row selected class
      row.removeClass('checked');
      // Uncheck the checkbox
      row.find(selectBox).prop('checked', false).change();
    }
    
    function toggleRow(row) {
      row = row || $(event.target).parents('tr');
      if (row.find(selectBox).is(':checked')) {
        unHighlightRow(row);
      } else {
        highlightRow(row);
      }
    }
    
    var lastChecked = null;

    // On click of a table row
    $(document).on('click', tableRowSelector, function(e) {
      
      var target          = $(e.target);
      var targetSelectBox = target.children(selectBox);

      if (target.is(getActions(this))) {
        return;
      }

      // Increase click-area size for checkboxes/radios
      if (targetSelectBox.length) {
        toggleRow();
      }
      
      // allow multiple rows to be selected by using the 'shift' key
      if ($(this).find('[type="checkbox"]').length) {
        
        // if the row was clicked whilst holding the 'shift' key
        if (e.shiftKey) {
          
          // reset the whole thing when shift is released
          $(document).on('keyup', function() {
            lastChecked = null;
          });
          
          // add a class to prevent accidental text highlighting when clicking row
          $(this).parents('table').addClass('table--no-select');
              
          // If we aren't selecting multiple ones, only toggle the target
          if(!lastChecked) {
            if ($(this).parents('tr').find('[type="checkbox"]').prop('checked', true)) {
              lastChecked = $(this);
            }
            toggleRow();
            return;
          }
          
          var start = $(tableRowSelector).index(this);
          var end = $(tableRowSelector).index(lastChecked);
          
          $(tableRowSelector).slice(Math.min(start,end) + 1, Math.max(start,end) + 1).each(function() {
            if ($(event.target).parents('tr').find(selectBox).is(':checked')) {
              unHighlightRow($(this));
            } else {
              highlightRow($(this));
            }
          });
          
          return;
        }
      
        lastChecked = $(this);
      }

      // Return if the row shouldn't be hoverable
      if (!checkForSingleAction(this)) {
        return;
      }

      // If the target element isn't a select box or and doesn't contain one
      // simulate a click of the row's primary action
      if (!target.is(selectBox) && !targetSelectBox.length) {
        getActions(this).get(0).click();
        return;
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
