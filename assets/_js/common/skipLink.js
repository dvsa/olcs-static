var OLCS = OLCS || {};

/**
 * OLCS.skipLink
 *
 * Gives focus to the content that is "skipped" to using the
 * skipToContent accessibility link
 * 
 * https://code.google.com/p/chromium/issues/detail?id=37721
 * https://code.google.com/p/chromium/issues/detail?id=262171
 * http://stackoverflow.com/questions/6280399/skip-links-not-working-in-chrome
 */

OLCS.skipLink = (function(document, $, undefined) {

  'use strict';

  return function init(options) {
    
    var trigger = options.trigger;
    var target  = options.target;
    
    $(trigger).click(function () {
      $(target).attr('tabIndex', -1).focus();
    });

  };

}(document, window.jQuery));