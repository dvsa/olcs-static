var OLCS = OLCS || {};

/**
 * OLCS.modalResponse
 *
 * Thin wrapper around normalise response; if the response we get back
 * looks okay, we pop open a modal. If not, we try and render any errors
 * in the parent page if a body selector was provided
 */

OLCS.modalResponse = (function(document, $, undefined) {

  "use strict";

  return function modaliseResponse(bodySelector) {
    return OLCS.normaliseResponse(function(data) {
      if (bodySelector && data.hasErrors) {
        OLCS.formHelper.render(bodySelector, data.body);
        return;
      }

      // assume that the the modal we get back has a form,
      // so invoke a wrapper component to bind a formHandler
      // and show the modal at the same time.

      // this is safe to do because binding a form handler on
      // the modal's content won't trigger unless there
      // is in fact a form to submit
      OLCS.formModal(data);
    });
  };

}(document, $));
