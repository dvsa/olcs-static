var OLCS = OLCS || {};

/**
 * OLCS.checkboxes
 *
 * Makes checkboxes inputs more clickable
 *
 */

OLCS.checkboxes = (function(document, $, undefined) {

  'use strict';

  return function init(options) {

    var inputSelector = 'input[type="checkbox"]';

    $(document).on('change', inputSelector , function () {
       
        if ($(this).is(':checked')) {
          $(this).parent('label').addClass('selected'); 
        } else {
          $(this).parent('label').removeClass('selected');
        }
        
    });

  };

}(document, window.jQuery));


