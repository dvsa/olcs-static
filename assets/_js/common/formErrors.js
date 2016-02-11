var OLCS = OLCS || {};

/**
 * OLCS.formErrors
 *
 * Automatically set focus to and scroll to form errors
 * 
 * grunt test:single --target=formErrors
 */

OLCS.formErrors = (function(document, $, undefined) {

  'use strict';

  return function init(options) {
    
    var container = options.container;
  
    // Make container focusable and set focus
    $(container).attr('tabIndex', -1).focus();
    
    // Scroll to the container
    window.location.hash = container;

  };

}(document, window.jQuery));