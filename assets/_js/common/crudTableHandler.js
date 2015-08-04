var OLCS = OLCS || {};

/**
 * CRUD Table Handler
 */
OLCS.crudTableHandler = (function(document, $, undefined) {

  "use strict";

  return function init(options) {

    if (!$.isPlainObject(options)) {
      options = {};
    }

    var crudActionSelector = options.selector ||  [
      ".table__header button:not(.js-disable-crud)",
      ".table__wrapper input[type=submit]",
      ".table__empty button"
    ].join(",");

    var modalBodySelector  = ".modal__content";
    var mainBodySelector   = ".js-body, .js-body__main";
    var modalWrapper       = ".modal__wrapper";

    var F = OLCS.formHelper;


    $(document).on("click", crudActionSelector, function handleCrudClick(e) {
      e.preventDefault();

      var button = $(this);
      var form   = $(this).parents("form");

      /**
       * We manually handle rendering the modal because we need to intercept
       * any errors triggered when the user clicks a CRUD button. This isn't
       * ideal because we have to inspect the HTML (nasty) but in the absence
       * of a proper JSON payload or a better status code, it's our only
       * choice
       */
      function handleCrudAction(response) {
        // if we find any errors or flash warnings, completely
        // re-render our main body
        if (response.hasErrors || response.hasWarnings) {
          return F.render(mainBodySelector, response.body);
        }

        // otherwise clear any we might have had previouosly
        F.clearErrors();

        var options = {
          success: OLCS.normaliseResponse({
            /**
             * We trap redirects and handle them ourselves, because if the redirect
             * URL is the current page we want to ignore it and just hide the modal
             * instead
             */
            followRedirects: false,
            callback: handleCrudResponse
          })
        };

        OLCS.modalForm($.extend(response, options));
      }

      /**
       * We manually handle any responses or redirects
       * inside the modal; this means we have to do a bit more
       * heavy lifting than is ideal, but it gives us the flexibility
       * we need
       */
      function handleCrudResponse(response) {

        // if the original response was a redirect then be sure to respect
        // that by closing the modal
        if (response.status === 302) {
          if (OLCS.url.isCurrent(response.location)) {
            return OLCS.modal.hide();
          }
          return OLCS.url.load(response.location);
        }

        if (response.status === 200) {

          // always render; could be a clean form (if we clicked add another),
          // could be riddled with errors
          F.render(modalBodySelector, response.body);

          // @see https://jira.i-env.net/browse/OLCS-6698
          // we used to scroll to top just in the event of errors,
          // but it's preferable to always do it instead
          $(modalWrapper).scrollTop(0);
        }
      }

      // make sure any backend code sniffing button presses isn't disappointed
      F.pressButton(form, button);

      // hook everything up and submit the form
      OLCS.submitForm({
        form: form,
        success: OLCS.normaliseResponse(handleCrudAction)
      });
    });



  };

}(document, window.jQuery));
