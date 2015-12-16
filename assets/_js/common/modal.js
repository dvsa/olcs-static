var OLCS = OLCS || {};

/**
 * Modal
 *
 * Must be provided with content and an optional title.
 * Currently only allows for one modal to be displayed at
 * a time (may need addressing in future).
 */

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
  var selector  = '.modal';
  var wrapper   = '.modal__wrapper';
  var overlay   = '.overlay';
  var header    = '.modal__title';
  var content   = '.modal__content';
  var bodyClass = 'disable-scroll';

  var closeSelectors = selector + '__close, ' + content + ' #cancel';

  var template = [
    '<div class="overlay" style="display:none;"></div>',
    '<div class="modal__wrapper" style="display:none;">',
      '<div class="modal" role="dialog" aria-labelledby="modal-title" tabindex="1">',
        '<div class="modal__header">',
          '<h1 class="modal__title" id="modal-title"></h1>',
        '</div>',
        '<div class="modal__content"></div>',
        '<a href="" class="modal__close" aria-label="close">Close</a>',
      '</div>',
    '</div>'
  ].join('\n');


  $(document).on('click', closeSelectors, function(e) {
    e.preventDefault();
    exports.hide();
  });

  $(document).keyup(function(e) {
    if (e.keyCode === 27 && exports.isVisible()) {
      e.preventDefault();
      exports.hide();
    }
  });

  /**
   * public interface
   */
  exports.show = function(body, title) {

    // if there isn't a modal showing already,
    // insert the template and give the body a special class
    if ($('body').find(overlay).length === 0) {
      $('body')
        .prepend(template)
        .addClass(bodyClass);
    }

    // insert the title and content into the modal
    $(header).html(title || '');
    $(content).html(body);

    // now we've got everything we need it's time to show it
    $(wrapper +','+overlay).show();

    // focus on the modal itself
    $(selector).focus();

    // let other potentially interested components know
    // there's been a render event
    OLCS.eventEmitter.emit('render');

    // if we've previously opened a modal and scrolled it our modal wrapper
    // needs resetting
    $(wrapper).scrollTop(0);

  };

  exports.hide = function() {

    // sometimes we want to trigger a different action when we
    // hide the modal, such as showing a confirmation box.
    // If form has a data attribute of close-trigger
    // then trigger a click of the specified selector
    var form = $(content).find('form[data-close-trigger]');

    if (form.length) {
      var selector = form.data('close-trigger');
      $(selector).trigger('click');
      return;
    }

    // clean things uo
    $('body').removeClass(bodyClass);
    $(wrapper +','+overlay).remove();

    // let other components know that the modal is hidden
    OLCS.eventEmitter.emit('hide:modal');

  };

  exports.isVisible = function() {
    return $(wrapper).is(':visible');
  };

  exports.updateBody = function(body) {
    var position = $(wrapper).scrollTop();
    OLCS.formHelper.render(content, body);
    $(wrapper).scrollTop(position);
  };

  return exports;

}(document, window.jQuery));
