var OLCS = OLCS || {};

OLCS.normaliseResponse = (function(window, $, undefined) {

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
    var bodySelector    = options.body || ".js-body,.js-body__main";
    var scriptSelector  = options.script || ".js-script";
    var rootSelector    = options.root || ".js-response";
    var followRedirects = options.followRedirects !== undefined ? options.followRedirects : true;


    /**
     * This method is used to paper over the cracks present in our wildly inconsistent views.
     * Ideally it wouldn't exist as every title would be rendered in a proper header view
     * and thus be placed automatically inside js-title when rendered asynchronously but that's
     * often not the case on olcs-internal. As such this method is a bit of a catch-all workhorse
     * which tries to rummage through what *should* be the body of the response and look for
     * a title-esque field
     */
    function findTitle(body) {
      var title;
      var text = "";

      // first up try the sensible option; just grab the first heading which is an
      // immediate descendent of the content block
      title = $(body).find(".js-content").children("h1,h2,h3,h4,h5,h6").first();

      if (title.length === 0) {
        // okay, no luck. Internal templates often appear within a header container - try that
        title = $(body).find(".content__header");
      }

      // hopefully we've got a title. If so we need to explicitly remove it from the body block
      // otherwise it'll be duplicated
      if (title.length) {
        text = title.text();
        $(title).remove();
      }

      return text;
    }

    function parse(responseString) {
      var title  = "";
      var body   = "";
      var script = "";
      var response;

      // this can throw if the response we get back can't be parsed (i.e. var dumped data during debug)
      try {
        title  = $(responseString).find(titleSelector);
        body   = $(responseString).find(bodySelector);
        script = $(responseString).find(scriptSelector);
      } catch (e) {
        OLCS.logger.debug("Caught error parsing response", "normaliseResponse");
      }

      /**
       * We set up some sensible defaults here so that if we can't parse anything else
       * of use we at least turn a usable response
       */
      response = {
        status: 200,
        title: "",
        body: responseString,
        // @TODO populate actual array of errors too
        //errors: [],
        hasErrors: false,
        hasWarnings: false
      };

      if (title.length) {
        OLCS.logger.debug("found response title matching " + titleSelector, "normaliseResponse");
        response.title = title.last().text();
        if ($.trim(response.title) === "") {
          OLCS.logger.debug("title selector contents is empty, falling back to searching body");
          response.title = findTitle(body);
        }
      } else {
        OLCS.logger.debug("no matching response title for " + titleSelector + ", searching headings...", "normaliseResponse");
        response.title = findTitle(body);
      }

      if (body.length) {
        var deepest = null;
        var depth = -1;

        // our templates, particularly on olcs-internal, are a bit of a mess - we sometimes find multiple .js-body tags and
        // sometimes even have a .js-body within a .js-body__main (which should never be right).
        $.each(body, function(_, v) {
          var dist = $(v).parentsUntil(rootSelector).length;
          if (dist > depth) {
            depth = dist;
            deepest = $(v);
          }
        });

        OLCS.logger.debug("got response body matching ." + deepest.attr("class") + " at depth " + depth, "normaliseResponse");

        // js-script will often live within js-body; we want to lift it out as it'll be appended
        // afterwards
        deepest.find(scriptSelector).remove();
        response.body = deepest.html();

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

      return response;
    }

    // ... the inner function will be invoked, we suppose, by an AJAX request or similar
    return function onResponse(response) {

      if (typeof response === "string") {
        OLCS.logger.debug("converting response string to object", "normaliseResponse");
        response = parse(response);
      }

      // we won't invoke the callback if the status
      // is a straightforward redirect
      if (response.status === 302 && followRedirects) {

        // Fake the modal.hide functionality to avoid reloading
        // the parent
        $(".modal__wrapper, .overlay").remove();
        OLCS.preloader.show("modal");

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

}(window, window.jQuery));
