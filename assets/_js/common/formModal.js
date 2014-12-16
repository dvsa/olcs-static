var OLCS = OLCS || {};

OLCS.formModal = (function(document, $, undefined) {

  "use strict";

  return function init(data) {
    // ... assume that the response we get back should be shown in
    // a modal
    OLCS.modal.show(data.body, data.title);

    // also assume that we've got a form within the rendered modal
    // and bind a form handler to it
    var handler = OLCS.formHandler({
      form: ".modal__content form",
      isModal: true,
      container: ".modal__content",
      onChange: false
    });

    // because handler uses event delegation, the listeners it sets
    // up will keep hanging around after the modal is closed, which
    // means if it's re-opened they'll rebind and trip each other up
    // As such, we need to manually unbind them each time.
    OLCS.eventEmitter.once("hide:modal", function unbind() {
      handler.unbind();
    });
  };

}(document, window.jQuery));
