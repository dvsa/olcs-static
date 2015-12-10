var OLCS = OLCS || {};

/**
 * OLCS.modalLink
 *
 * Triggers an AJAX request, the response from which is
 * used to populate a modal
 *
 * Typically invoked by binding a listener on links which
 * want to open in a modal
 *
 * @NOTE: the way this is named is the same as OLCS.submitForm
 * but they behave differently (this binds listeners, that
 * actually fires a form immediately). These could do with
 * being made more consistent with each other.
 */

OLCS.modalLink = (function(document, $, undefined) {

  'use strict';

  return function init(options) {
    var trigger = options.trigger;

    $(document).on('click', trigger, function(e) {
      e.preventDefault();

      // stop any other things like table rows getting greedy
      // and causing this event to re-trigger
      e.stopPropagation();

      var key = $(this).attr('href');
      var form = ""

      // Because we can only have one modal, it's fair to assume we can hide all
      // this was added to cater for when we need to trigger a new modal, when
      // one is already showing
      //
      // @NOTE: Because we now reload the parent whenever a modal is hidden, firing
      // this when the modal is invoked was causing the parent to reload uneccessarily.
      //
      // OLCS.modal.hide();
      // OLCS.preloader.show();

      OLCS.ajax({
        url: key,
        // bear in mind this component will create a modalForm wrapper
        success: OLCS.modalResponse(),
        preloader: 'modal'
      });
    });
  };

}(document, window.jQuery));
