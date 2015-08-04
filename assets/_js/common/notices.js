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
  var noticeSelector          = 'div[class^="notice--"]';

  return function init() {

    function addCloseButton() {
      $(noticeSelector)
        .find('p')
        .prepend('<a href="" class="notice__link">Close</a>');
    }

    function remove(element) {
      $(element).remove();
    }

    function fadeOut(element) {
      $(element)
        .delay(10000)
        .fadeOut(300, function() {
          remove(element);
      });
    }

    $(document).on('click', closeLinkSelector, function(e) {
      e.preventDefault();
      // If there is more than one notice, remove itself
      if ($(this).parents(noticeSelector).siblings().length) {
        remove($(this).parents(noticeSelector));
      } else {
        // Otherwise remove the whole notice container
        remove($(this).parents(noticeContainerSelector));
      }
    });


    OLCS.eventEmitter.on('render', function() {
      addCloseButton();

      // fade out any notice containers on render,
      // so long as they're not in a modal or in the
      // right hand column
      //
      // @NOTE: This need to be more specific
      $(noticeContainerSelector).each(function() {
        if (!$(this).parents().is('.modal, .one-fifth--right')) {
          fadeOut($(this));
        }
      });
    });


  };

}(document, window.jQuery));
