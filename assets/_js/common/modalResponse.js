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
      OLCS.formModal(data);
    });
  };

}(document, $));
