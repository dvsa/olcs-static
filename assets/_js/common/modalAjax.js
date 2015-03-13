var OLCS = OLCS || {};

/**
 * OLCS.modalAjax
 *
 * Triggers an AJAX request, the response from which is
 * used to populate a modal
 *
 * Typically invoked by binding a listener on links which
 * want to open in a modal
 *
 * @NOTE: the way this is named is the same as OLCS.formAjax
 * but they behave differently (this binds listeners, that
 * actually fires a form immediately). These could do with
 * being made more consistent with each other.
 */

OLCS.modalAjax = (function(document, $, undefined) {

  'use strict';

  return function init(options) {
    var trigger = options.trigger;

    $(document).on('click', trigger, function(e) {
      e.preventDefault();

      // stop any other things like table rows getting greedy
      // and causing this event to re-trigger
      e.stopPropagation();

      var key = $(this).attr('href');

      // Because we can only have 1 modal, it's fair to assume we can hide all
      // this was added to cater for when we need to trigger a new modal, when 1 is already showing
      OLCS.modal.hide();

      OLCS.ajax({
        url: key,
        success: OLCS.normaliseResponse(function(data) {

          // assume that the the modal we get back has a form,
          // so invoke a wrapper component to bind a formHandler
          // and show the modal at the same time.

          // this is safe to do because binding a form handler on
          // the modal's content won't trigger unless there
          // is in fact a form to submit
          OLCS.formModal(data);
        })
      });
    });
  };

}(document, window.jQuery));
