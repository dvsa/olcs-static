var OLCS = OLCS || {};

/**
 * CRUD Table Handler
 */
OLCS.crudTableHandler = (function(document, $, undefined) {

  "use strict";

  return function init() {

    var crudActionSelector = ".table__header button, .table__wrapper input[type=submit]";
    var modalBodySelector  = ".modal__content";
    var mainBodySelector   = ".js-body";
    var modalWrapper       = ".modal__wrapper";

    var F = OLCS.formHelper;

    /**
     * Helper to reload the parent window behind the modal
     */
    function reloadParent() {
      $.get(window.location.href, OLCS.normaliseResponse(function(response) {
        renderParent(mainBodySelector, response.body);
      }));
    }

    function renderParent(container, content) {
      // the fact we redraw the entire main body means we lose our
      // scroll position; so cache it and re-apply it immediately after render
      var scrollTop = $(window).scrollTop();

      F.render(container, content);

      $(window).scrollTop(scrollTop);
    }

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
          return renderParent(mainBodySelector, response.body);
        }

        // otherwise clear any we might have had previouosly
        F.clearErrors();

        var options = {
          success: OLCS.normaliseResponse({
            followRedirects: false,
            callback: handleCrudResponse
          })
        };

        OLCS.formModal($.extend(response, options));
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
          return OLCS.modal.hide();
        }

        if (response.status === 200) {

          // always render; could be a clean form (if we clicked add another),
          // could be riddled with errors
          F.render(modalBodySelector, response.body);

          if (response.hasErrors) {
            // after a bit of manual testing it was decided to re-scroll the
            // modal to the top in the event of errors
            $(modalWrapper).scrollTop(0);
          }
        }
      }

      // make sure any backend code sniffing button presses isn't disappointed
      F.pressButton(form, button);

      // hook everything up and submit the form
      OLCS.formAjax({
        form: form,
        success: OLCS.normaliseResponse(handleCrudAction)
      });
    });

    /**
     * Make sure any time the parent page is re-rendered we re-bind any one-off form initialisation
     */
    OLCS.eventEmitter.on("render", OLCS.formInit);

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
  };

}(document, window.jQuery));
