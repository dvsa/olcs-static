var OLCS = OLCS || {};

/**
 * OLCS.textareaPlaceholder
 *
 * A known bug exists in earlier versions of Internet Explorer which
 * causes issues with dynamically created textareas that have a
 * placeholder attribute. Instead of being applied as a placeholder,
 * it gets applied as the actual value - https://goo.gl/zfBuux.
 *
 */

OLCS.textareaPlaceholder = (function(document, $, undefined) {

  'use strict';

  return function init(options) {
  
    // When any textarea HTML element is clicked
    $(document).on("click", "textarea", function() {
      // Check to see if the placeholder value equals the actual value
      if ($(this).attr('placeholder') == $(this).val()) {
        // If so, empty the actual value
        $(this).val("");
      }
    });  

  };

}(document, window.jQuery));