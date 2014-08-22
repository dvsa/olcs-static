var OLCS = OLCS || {};

OLCS.modal = (function(document, $, undefined) {

  'use strict';

  /**
   * local variable declarations
   * and public export
   */
  var exports = {};

  /**
   * private interface
   */
  var selector = '.modal';
  var wrapper  = '.modal__wrapper';
  var header   = '.modal__title';
  var content  = '.modal__content';

  var template = [
    '<div class="overlay  js-hidden"></div>',
    '<div class="modal__wrapper js-hidden">',
      '<div class="modal">',
        '<div class="modal__header">',
          '<h2 class="modal__title"></h2>',
          '<a href="" class="modal__close">Close</a>',
        '</div>',
        '<div class="modal__content"></div>',
      '</div>',
    '</div>'
  ].join('\n');

  /**
   * public interface
   */
  exports.show = function(body, title) {
    var closeSelectors = selector + '__close, ' + content + ' #cancel';

    if ($('body').find(wrapper).length === 0) {
      $('body').prepend(template);
    }

    $(header).html(title || '');
    $(content).html(body);
    $(wrapper).prev().show();
    $(wrapper).show();

    $(document).on('click', closeSelectors, function(e) {
      e.preventDefault();
      exports.hide();
    });
  };

  exports.hide = function() {
    $(document).off('click', selector + '__close');
    $(wrapper).hide();
    $(wrapper).prev().hide();
  };

  return exports;

}(document, window.jQuery));
