var OLCS = OLCS || {};

/**
 * Url
 *
 * Contains url helper methods
 */

OLCS.url = (function(document, $, undefined) {

  'use strict';

  function hasTrailingSlash(string) {
    var lastChar = string.substr(string.length - 1);

    return lastChar === '/';
  }

  var exports = {
    isSame: function(url1, url2) {
      if (!hasTrailingSlash(url1)) {
        url1 += '/';
      }

      if (!hasTrailingSlash(url2)) {
        url2 += '/';
      }

      return url1 === url2;
    },

    isCurrent: function(url1) {
      return exports.isSame(url1, window.location.pathname);
    },

    load: function(url) {
      OLCS.preloader.show();
      window.location.href = url;
    }
  };

  return exports;

}(document, $));
