var OLCS = OLCS || {};

/**
 * Conditionally Toggle Button State On Change
 *
 * Helper class to toggle the state of an action button
 * based on the value of a piece of data in a button's
 * wrapping <tr>. Example options:
 * {
 *  dataElSelector: '[data-heading="Document status"]',
 *  dataElValToCheck: 'New',
 *  buttonSelector: '#publish',
 *  stateAttr: 'disabled',
 *  stateAttrVal: true
 * }
 *
 */

OLCS.conditionallyToggleButtonStateOnChange = (function (document, $, undefined) {

  'use strict';

  return function init(options) {

    if (!options || !options.dataElSelector || !options.dataElValToCheck || !options.buttonSelector || !options.stateAttr || !options.stateAttrVal) {
      throw new Error('OLCS.toggleButtonStateOnChange requires a dataElSelector, dataElValToCheck, buttonSelector, stateAttrVal and a stateAttr option');
    }

    function onChange() {
      var $checkedInput = $('input:checked');
      if ($checkedInput.length > 0) {
        var dataElVal = $checkedInput.parents('tr').find(options.dataElSelector).text();
        var disableButton = dataElVal === options.dataElValToCheck;
        if (typeof options.stateAttrVal === 'boolean') {
          if (disableButton) {
            return $(options.buttonSelector).attr(options.stateAttr, options.stateAttrVal);
          } else {
            return $(options.buttonSelector).removeAttr(options.stateAttr);
          }
        }
        return $(options.buttonSelector).attr(options.stateAttr, options.stateAttrVal);
      }
    }

    $(document).on('change', onChange);

  };

}(document, window.jQuery));