var OLCS = OLCS || {};

/**
 * OLCS.selectInputs
 *
 * Makes checkboxes and radios more clickable
 *
 */

OLCS.selectInputs = (function(document, $, undefined) {

  'use strict';

  var inputs = 'label input:radio, label input:checkbox';

  return function init(options) {

    // On click of a inputs
    $(document).on('change', inputs, function(e) { 
      
      if ($(this).is(':checked')) {
        $(this).parent('label').addClass('selected');
      } else {
        $(this).parent('label').removeClass('selected');
      }

      
    });

  };

}(document, window.jQuery));
