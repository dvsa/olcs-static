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

  var preloaderSelectors = 'div[class*=preloader]'
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
    $("<div class=preloader-icon--inline></div>").insertAfter('.js-find');
  }

  /**
   * public interface
   */
  exports.show = function(type) {

    console.log('SHOWING MODAL')

    switch (type) {
      case 'modal':
        modalPreloader();
        break;
      case 'table':
        tablePreloader();
        break;
      case 'inline':
        inlinePreloader();
        break;
    }

  };

  exports.hide = function() {
    $(preloaderSelectors).remove();
  };

  return exports;

}(document, window.jQuery));
