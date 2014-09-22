var OLCS = OLCS || {};

OLCS.modalAjax = (function(document, $, undefined) {

  'use strict';

  return function init(options) {
    var trigger = options.trigger;

    $(document).on('click', trigger, function(e) {
      e.preventDefault();

      var key = $(this).attr('href');

      $.ajax({
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
