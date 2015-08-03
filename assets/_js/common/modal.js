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

  /**
   * Helper to reload the parent window behind the modal
   */
  function reloadParent() {

    OLCS.ajax({
      url: window.location.href,
      success: OLCS.normaliseResponse(function(response) {
        OLCS.formHelper.render(".js-body", response.body);
        console.log('Parent reloaded');
      })
    });
  }

  /**
   * public interface
   */
  exports.show = function(body, title) {
    if ($('body').find(overlay).length === 0) {
      $('body').prepend(template);
    }

    $(header).html(title || '');
    $(content).html(body);

    $('body').addClass(bodyClass);

    // overlay first...
    $(wrapper).prev().show();
    // ... then the modal itself
    $(wrapper).show();

    $(selector).focus();

    // @TODO: does anything care about this anymore? a grep is in order
    OLCS.eventEmitter.emit('show:modal');

    // let other potentially interested components know
    // there's been a render event
    OLCS.eventEmitter.emit('render');

    // @NOTE: why does the listener have to be set up here?
    // it can be done on bootstrap and we can do away with
    // the constant on/off stuff...
    $(document).on('click', closeSelectors, function(e) {
      e.preventDefault();
      exports.hide();
      OLCS.eventEmitter.emit('modal:cancel');
    });

    $(document).keyup(function(e) {
      if (e.keyCode === 27) {
        e.preventDefault();
        exports.hide();
        // OLCS.eventEmitter.emit('modal:cancel');
      }
    });

    // if we've previously opened a modal and scrolled it our modal wrapper
    // needs resetting
    $(wrapper).scrollTop(0);
  };

  exports.hide = function() {
    $(document).off('click', closeSelectors);

    $('body').removeClass(bodyClass);

    // ... hide the overlay first...
    $(wrapper).prev().hide();
    // ... then the modal itself
    $(wrapper).hide();

    // Show the preloader until the content has been rendered
    OLCS.preloader.show();

    // now obliterate them completely
    $(wrapper).prev().remove();
    $(wrapper).remove();

    OLCS.eventEmitter.emit('hide:modal');

    // Always reload the paren
    reloadParent();
  };


  return exports;

}(document, window.jQuery));
