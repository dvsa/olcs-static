var OLCS = OLCS || {};

OLCS.normaliseResponse = (function(window, undefined) {

  "use strict";

  // the return value is a simple function which takes
  // a callback; this callback will be invoked with the
  // normalised response...
  return function init(callback) {

    if (typeof callback !== "function") {
      throw new Error("Please supply a callback function");
    }

    // ... the inner function will be invoked, we suppose,
    // by an AJAX request or similar
    return function onResponse(response) {
      if (typeof response === "string") {
        response = {
          status: 200,
          html: response
        };
      }

      // we won't invoke the callback if the status
      // is a straightforward redirect
      if (response.status === 302) {
        window.location.href = response.location;
        return;
      }

      // otherwise simply invoke the callback with the
      // nice response object
      return callback(response);
    };
  };

}(window));
