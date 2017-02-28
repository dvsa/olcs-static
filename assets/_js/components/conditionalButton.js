var OLCS = OLCS || {};

/**
 * Conditional button
 */

OLCS.conditionalButton = (function(document, $, undefined) {

  'use strict';

  return function init(options) {

    if (options.label && options.selector) {
      throw new Error('\'label\' and \'selector\' are mutually exclusive');
    }

    var filter;
    var selector = options.container || options.form;

    if (options.label) {
      filter = '[value="' + options.label + '"]';
    } else {
      filter = options.selector;
    }

    var predicate       = options.predicate;
    var checkedSelector = options.checkedSelector || 'table :checked';
    var actionSelector  = '.actions-container button';
  
    if ($.isPlainObject(predicate)) {
      predicate = OLCS.complexPredicate(predicate);
    }

    function checkButton(context) {

      var button = $(context).find(actionSelector).filter(filter);

      if (button.length) {
        var checkedInputs = $(context).find(checkedSelector);
        predicate(checkedInputs.length, function(enabled) {
          if (enabled) {
            button.prop('disabled', false);
          } else {
            button.prop('disabled', true);
          }
        }, checkedInputs);
      }

    }

    $(document).on('change', selector, function() {
      checkButton(this);
    });

    function setup() {
      $(selector).change();
    }

    // Give conditional buttons a kick on each re-render
    OLCS.eventEmitter.on('render', setup);

  };

}(document, window.jQuery));
