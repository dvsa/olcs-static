var OLCS = OLCS || {};

/**
 * OLCS.notices
 *
 * Allows the user to close flash messages, and fades them out
 * automatically after a few seconds
 */

OLCS.notices = (function(document, $, undefined) {

  'use strict';

  var closeLinkSelector       = '.notice__link';
  var noticeContainerSelector = '.notice-container';

  return function init() {

    function remove(element) {
      $(element).remove();
    }

    $(noticeContainerSelector)
      .delay(6000)
      .fadeOut(300, function() {
        remove($(this));
    });
    
    $(document).on('click', closeLinkSelector, function(e) {
      e.preventDefault();
      
      if ($(this).closest('div').siblings().length) {
        remove($(this).closest('div'));
      } else {
        remove(noticeContainerSelector);
      }

    });

  };

}(document, window.jQuery));
