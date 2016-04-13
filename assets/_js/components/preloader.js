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

  var preloaderSelectors = 'div[class*=preloader]';
  var template;

  function modalPreloader () {
    template = [
      '<div class="preloader-overlay--modal"></div>',
      '<div class="preloader-icon--modal"></div>',
    ].join('\n');

    $('body').prepend(template);
  }

  function tablePreloader () {
    template = [
      '<div class="preloader-overlay--table"></div>',
      '<div class="preloader-icon--table"></div>',
    ].join('\n');

    $('.table__wrapper').prepend(template);
  }

  function inlinePreloader () {
    $('<div class=preloader-icon--inline></div>').insertAfter('.js-active');
  }

  /**
   * public interface
   */

  exports.show = function(type) {

    // Dont show another preloader if there's already one on the screen
    if ($(preloaderSelectors).length) {
      OLCS.logger.debug('Already a preloader');
      return;
    }

    switch (type) {
      case undefined:
        OLCS.logger.debug('Undefined preloader type');
        break;
      case 'modal':
        OLCS.logger.debug('Modal preloader');
        modalPreloader();
        break;
      case 'table':
        OLCS.logger.debug('Table preloader');
        tablePreloader();
        break;
      case 'inline':
        OLCS.logger.debug('Inline preloader');
        inlinePreloader();
        break;
    }

  };

  exports.hide = function() {
    $(preloaderSelectors).remove();
  };

  return exports;

}(document, window.jQuery));
