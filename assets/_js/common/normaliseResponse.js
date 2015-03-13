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
      if (typeof response === "string") {

        OLCS.logger.group("OLCS.normaliseResponse");
        OLCS.logger.debug("converting response string to object", "normaliseResponse");

        var title  = $(response).find(titleSelector);
        var body   = $(response).find(bodySelector);
        var script = $(response).find(scriptSelector);

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
          response.title = title.html();
        } else {
          OLCS.logger.debug("no matching response title for " + titleSelector, "normaliseResponse");
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
          response.body += script.html();
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
        OLCS.preloader.show();
        window.location.href = response.location;
        return;
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

      OLCS.logger.groupEnd();

      // by the time we get here we've got a nice consistent response, whatever
      // we got back from the backend
      return callback(response);
    };
  };

}(window));
