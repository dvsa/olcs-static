var OLCS = OLCS || {};

/**
 * AJAX
 *
 * Simple wrapper component around jQuery.ajax which allows better
 * request and response introspection
 */

OLCS.ajax = (function(document, $, undefined) {

  "use strict";

  var lastRequestId = 0;

  return function ajax(options) {

    var requestId = ++lastRequestId;

    // although jQuery doesn't care about missing defauts, we do
    // for the purposes of logging
    options = $.extend({
      method: "GET"
    }, options);

    var finalOptions = $.extend({}, options, {
      beforeSend: function(jqXHR, settings) {
        var method = options.method.toUpperCase();

        OLCS.logger
        .group(method + " " + options.url)
        .log("Request ID " + requestId + ": start");

        if (method === "POST") {
          OLCS.logger.log("Request data: " + settings.data);
        }

        if (options.beforeSend) {
          options.beforeSend.apply(null, arguments);
        }
      },
      success: function(data, textStatus, jqXHR) {
        OLCS.logger
        .log("Request ID " + requestId + ": end (" + jqXHR.status + " " + textStatus + ")")
        .groupEnd();

        if (options.success) {
          options.success.apply(null, arguments);
        }
      },
      error: function(jqXHR, testStatus, errorThrown) {
        OLCS.logger
        .warn("Request ID " + requestId + ": " + errorThrown)
        .groupEnd();

        if (options.error) {
          options.error.apply(null, arguments);
        }
      },
      // this fires *after* success or error
      complete: function() {
        if (options.complete) {
          options.complete.apply(null, arguments);
        }
      }
    });

    return $.ajax(finalOptions);
  };

}(document, window.jQuery));
