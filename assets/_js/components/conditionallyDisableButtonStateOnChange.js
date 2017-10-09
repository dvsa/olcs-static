var OLCS = OLCS || {};

/**
 * Conditionally Disable Button State On Change
 *
 * Helper class to Disable the state of an action button
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

OLCS.conditionallyDisableButtonStateOnChange = (function (document, $, undefined) {

  'use strict';

  return function init(options) {

    if (!options || !options.dataElSelector || !options.dataElValToCheck || !options.buttonSelector || !options.stateAttr || !options.stateAttrVal) {
      throw new Error('OLCS.disableButtonStateOnChange requires a dataElSelector, dataElValToCheck, buttonSelector, stateAttrVal and a stateAttr option');
    }

    function onChange() {
      var $checkedInput = $('input:checked');
      if ($checkedInput.length > 0) {
        var dataElVal = $checkedInput.parents('tr').find(options.dataElSelector).text();
        var disableButton = dataElVal === options.dataElValToCheck;
        if (disableButton) {
          return $(options.buttonSelector).attr(options.stateAttr, options.stateAttrVal);
        } else {
          return $(options.buttonSelector).removeAttr(options.stateAttr);
        }
      }
    }

    $(document).on('change', onChange);

  };

}(document, window.jQuery));