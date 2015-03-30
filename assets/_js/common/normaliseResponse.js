var OLCS = OLCS || {};

OLCS.normaliseResponse = (function(window, undefined) {

  "use strict";

  // the return value is a simple function which takes
  // a callback; this callback will be invoked with the
  // normalised response...
  return function init(options) {

    if (!$.isPlainObject(options)) {
      options = {
        callback: options
      };
    }

    if (typeof options.callback !== "function") {
      throw new Error("OLCS.normaliseResponse requires at least a callback argument");
    }

    var callback        = options.callback;
    var titleSelector   = options.title || ".js-title";
    var bodySelector    = options.body || ".js-body";
    var scriptSelector  = options.body || ".js-script";
    var followRedirects = options.followRedirects !== undefined ? options.followRedirects : true;

    // ... the inner function will be invoked, we suppose,
    // by an AJAX request or similar
    return function onResponse(response) {
      var title  = "";
      var body   = "";
      var script = "";

      /**
       * This method is used to paper over the cracks present in our wildly inconsistent views.
       * Ideally it wouldn't exist as every title would be rendered in a proper header view
       * and thus be placed automatically inside js-title when rendered asynchronously but that's
       * often not the case on olcs-internal. As such this method is a bit of a catch-all workhorse
       * which tries to rummage through what *should* be the body of the response and look for
       * a title-esque field
       */
      function findTitleInBody() {
        // first up try the sensible option; just grab the first heading which is an
        // immediate descendent of the content block
        title = body.find(".js-content").children("h1,h2,h3,h4,h5,h6").first();
        if (title.length === 0) {
          // okay, no luck. Internal templates often appear within a header container - try that
          title = body.find(".content__header");
        }

        // hopefully we've got a title. If so we need to explicitly remove it from the body block
        // otherwise it'll be duplicated
        if (title.length) {
          response.title = title.text();
          $(title).remove();
        }
      }

      if (typeof response === "string") {

        OLCS.logger.debug("converting response string to object", "normaliseResponse");

        // this can throw if the response we get back can't be parsed (i.e. var dumped data during debug)
        try {
          title  = $(response).find(titleSelector);
          body   = $(response).find(bodySelector);
          script = $(response).find(scriptSelector);
        } catch (e) {
          OLCS.logger.debug("Caught error parsing response", "normaliseResponse");
          // @TODO wrap body in something sensible
        }

        response = {
          status: 200,
          title: "",
          body: response,
          // @TODO populate actual array of errors too
          //errors: [],
          hasErrors: false,
          hasWarnings: false
        };

        if (title.length) {
          OLCS.logger.debug("found response title matching " + titleSelector, "normaliseResponse");
          response.title = title.text();
          if ($.trim(response.title) === "") {
            OLCS.logger.debug("title selector contents is empty, falling back to searching body");
            findTitleInBody();
          }
        } else {
          OLCS.logger.debug("no matching response title for " + titleSelector + ", searching headings...", "normaliseResponse");
          findTitleInBody();
        }

        if (body.length) {
          OLCS.logger.debug("got response body matching " + bodySelector, "normaliseResponse");
          var inner = body.find(".js-body__main");
          if (inner.length) {
            OLCS.logger.debug(
              "got response body override matching .js-body__main",
              "normaliseResponse"
            );
            response.body = inner.html();
          } else {
            response.body = body.html();
          }
        } else {
          OLCS.logger.debug("no matching response body for " + bodySelector, "normaliseResponse");
        }

        // ensure scripts are injected too. If we want, we can
        // add an options.disableScripts or whatever to ignore them
        if (script.length) {
          OLCS.logger.debug("found inline script matching " + scriptSelector, "normaliseResponse");
          response.body += script.html();
        } else {
          OLCS.logger.debug("no matching inline script for " + scriptSelector, "normaliseResponse");
          // @TODO: if the original body contained inline script but we filtered it via js-body
          // or js-body__main, we'll have 'lost' the inline script on the page. Try and find it here
        }
      }

      // we won't invoke the callback if the status
      // is a straightforward redirect
      if (response.status === 302 && followRedirects) {
        // manually invoke a preloader; just to make sure that while the page physically
        // performs the navigation we show it as 'loading'
        OLCS.logger.debug(
          "caught 302 redirect; followRedirects=true; redirecting to " + response.location,
          "normaliseResponse"
        );

        return OLCS.url.load(response.location);
      }

      // otherwise start to inspect the response for any things of interest
      if (response.body) {
        response.hasErrors = OLCS.formHelper.containsErrors(response.body);
        response.hasWarnings = OLCS.formHelper.containsWarnings(response.body);

        if (response.hasErrors) {
          OLCS.logger.debug(
            "normalised response contains errors",
            "normaliseResponse"
          );
        }

        if (response.hasWarnings) {
          OLCS.logger.debug(
            "normalised response contains warnings",
            "normaliseResponse"
          );
        }
      }

      // by the time we get here we've got a nice consistent response, whatever
      // we got back from the backend
      return callback(response);
    };
  };

}(window));
