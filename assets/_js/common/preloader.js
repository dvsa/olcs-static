var OLCS = OLCS || {};

/**
 * Preloader
 */

OLCS.preloader = (function(document, $, undefined) {

  'use strict';

  var exports = {};

  /**
   * private interface
   */
  var wrapper      = '.preloader__wrapper';
  var showStack    = 0;

  var template = [
    '<div class="preloader__wrapper" style="display:none;">',
      '<div class="preloader"></div>',
      '<div class="preloader__icon"></div>',
    '</div>'
  ].join('\n');

  /**
   * public interface
   */
  exports.show = function() {

    // if there's already a modal on the page, or another
    // preloader then don't show
    if ($('.modal__wrapper, .address__preloader, .table-preloader__overlay').length) {
      return;
    }

    // @NOTE: temporary fix to prevent the modal showing
    // in the 'Type of licence' section on LVA
    // 4/8/15
    if ($('.js-title').text() === 'Type of licence') {
      return;
    }

    if ($('body').find(wrapper).length === 0) {
      $('body').prepend(template);
      showStack = 0;
    }

    showStack ++;

    $(wrapper).show();
  };

  exports.hide = function(options) {

    options = options || {};

    // we need to allow for the fact we might have multiple requests
    // outstanding to show the preloader. As such, only the last one
    // to ask for hide wins
    if (--showStack === 0) {

      // @NOTE: in time we might want an options.instant boolean or
      // similar
      $(wrapper).hide().remove();
    }
  };

  return exports;

}(document, window.jQuery));
