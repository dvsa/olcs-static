var OLCS = OLCS || {};

/**
 * OLCS.radioButtons
 *
 * Makes radio inputs more clickable
 *
 */

OLCS.radioButtons = (function(document, $, undefined) {

  'use strict';

  return function init(options) {

    $(document).on('change', 'input[type="radio"]', function () {
        
        var groupSelector = 'input[type="radio"][name="' + $(this).attr('name') + '"]';
        
        $(groupSelector).each(function() {
            
            if ($(this).is(':checked')) {
              $(this).parent('label').addClass('selected'); 
            } else {
              $(this).parent('label').removeClass('selected');
            }
        });
        
    });

  };

}(document, window.jQuery));


