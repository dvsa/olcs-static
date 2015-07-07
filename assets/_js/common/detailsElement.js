var OLCS = OLCS || {};

/**
 * OLCS.detailsElement
 *
 * Detect if the user's browser support the HTML5 <details>
 * element and provides a polyfill if it doesn't
 *
 */

OLCS.detailsElement = (function(document, $, undefined) {

  'use strict';

  return function init() {


    // @TODO -
    // This is a horrible way to detect support, look for
    // a better feature detection method
    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

    if (!isChrome) {
      $('html').addClass('no-details');

      $(document).on('click','summary',function() {
        $(this).find('.help__text').toggle();
      });

    }


  };

}(document, window.jQuery));
