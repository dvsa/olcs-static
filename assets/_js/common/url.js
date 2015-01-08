var OLCS = OLCS || {};

/**
 * Url
 *
 * Contains url helper methods
 */

OLCS.url = (function(document, $, undefined) {

  function hasTrailingSlash(string) {
    var lastChar = string.substr(string.length - 1);

    return lastChar === '/';
  };

  return {
    comparePath: function(url1, url2) {
      if (!hasTrailingSlash(url1)) {
        url1 += '/';
      }

      if (!hasTrailingSlash(url2)) {
        url2 += '/';
      }

      return url1 === url2;
    }
  };
}(document, $));
