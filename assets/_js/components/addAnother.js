var OLCS = OLCS || {};

/**
 * Add another
 *
 * Duplicates the last field in a fieldset, increments
 * the name and ID if needed and appends it to the end
 * of the fieldset.
 */
OLCS.addAnother = (function(document, $, undefined) {

  'use strict';

  var triggerSelector = '.hint input[type="submit"]';
  var targetSelector  = 'fieldset:last';

  return function init() {

    function incrementString(string) {
      var newString = string.replace(/\[(\d+)\]/, function(match, number) {
        return '[' + (parseInt(number, 10) + 1) + ']';
      });
      return newString;
    }

    function updateValues(element) {
      var field     = $(element);
      var input     = field.find('input');
      var inputName = incrementString(input.attr('name'));
      var inputID   = incrementString(input.attr('id'));

      field.attr({
        'data-group': incrementString(field.attr('data-group'))
      });

      input.attr({
        name: inputName,
        id: inputID,
      }).val('');

      return field;
    }

    $('body').on('click', triggerSelector, function(e) {
      e.preventDefault();

      var fieldset  = $(e.target).closest('.add-another');
      var lastField = fieldset.find(targetSelector).clone();
      var newField  = updateValues(lastField);

      // remove any error messages
      $(newField).find('ul').remove();

      $(newField).insertBefore(fieldset.find('.hint'));
    });

  };

}(document, window.jQuery));
