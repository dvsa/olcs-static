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

    function fadeOut(element) {
      // If our notice container isn't in a modal or the sidebar...
      // @NOTE We should really update the markup to make this more
      // specific instead of having to check parent elements
      if (!$(noticeContainerSelector).parents('.modal, .one-fifth--right').length) {
        $(noticeContainerSelector)
          .delay(6000)
          .fadeOut(300, function() {
            remove($(this));
        });
      }
    }

    OLCS.eventEmitter.on("render", fadeOut);

    $(document).on('click', closeLinkSelector, function(e) {
      e.preventDefault();
      
      // If there are more than one notice remove itself
      if ($(this).closest('div').siblings().length) {
        remove($(this).closest('div'));
      } else {
        // Otherwise remove the whole notice container
        remove(noticeContainerSelector);
      }

    });

    // Everything's in place and our listeners are ready; go!
    fadeOut();
  };

}(document, window.jQuery));
