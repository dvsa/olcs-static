var OLCS = OLCS || {};

OLCS.normaliseResponse = (function(window, undefined) {

  "use strict";

  // the return value is a simple function which takes
  // a callback; this callback will be invoked with the
  // normalised response...
  return function init(options) {

    if (typeof options === "function") {
      options = {
        callback: options
      };
    }

    if (typeof options.callback !== "function") {
      throw new Error("Please supply an options.callback function");
    }

    var callback        = options.callback;
    var titleSelector   = options.title || ".js-title";
    var bodySelector    = options.body || ".js-body";
    var scriptSelector  = options.body || ".js-script";
    var followRedirects = options.followRedirects || false;

    // ... the inner function will be invoked, we suppose,
    // by an AJAX request or similar
    return function onResponse(response) {
      if (typeof response === "string") {

        var title  = $(response).find(titleSelector);
        var body   = $(response).find(bodySelector);
        var script = $(response).find(scriptSelector);

        response = {
          status: 200,
          title: "",
          body: response
        };

        if (title.length) {
          response.title = title.html();
        }

        if (body.length) {
          var inner = body.find(".js-body__main");
          if (inner.length) {
            response.body = inner.html();
          } else {
            response.body = body.html();
          }
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
        OLCS.preloader.show();
        window.location.href = response.location;
        return;
      }

      // otherwise simply invoke the callback with the
      // nice response object
      return callback(response);
    };
  };

}(window));
