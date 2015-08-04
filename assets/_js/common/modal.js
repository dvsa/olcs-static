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
  var mainBodySelector ='.js-body, .js-body__main';

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
        OLCS.formHelper.render(mainBodySelector, response.body);
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

    // let other potentially interested components know
    // there's been a render event
    OLCS.eventEmitter.emit('render');

    // if we've previously opened a modal and scrolled it our modal wrapper
    // needs resetting
    $(wrapper).scrollTop(0);


    $(document).on('click', closeSelectors, function(e) {
      e.preventDefault();
      exports.hide();
    });

    if ($('.modal__content').length) {
      $(document).keyup(function(e) {
        if (e.keyCode === 27) {
          e.preventDefault();
          exports.hide();
        }
      });
    }

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

  };


  /**
   * Reload the parent page every time a modal is hidden. By and large this
   * works well and means our parent page is always fresh (CSRF, version numbers etc).
   * The only downside is that a user can close the modal without any interaction and
   * still trigger a spinner and a refresh which might confuse them. However, it's
   * still necessary because they've actually POSTed the original form and possibly
   * updated the version, so if they try and view another modal they'll get a version conflict
   *
   * We could 'optimistically' reload the parent as soon as the modal is rendered, but
   * you'd end up with a spinner on top of an otherwise ready modal form, and you'd
   * still have to update the parent if the user added / edited something in the modal
   * since the underlying table would need an update. This will do for now
   * and at least means the reload only happens once, and always at the same point in
   * the flow
   */

  OLCS.eventEmitter.on("hide:modal", reloadParent);

  return exports;

}(document, window.jQuery));
