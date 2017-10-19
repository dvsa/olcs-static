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

    isSame: function(url1, url2, ignoreParameters) {
      if(typeof ignoreParameters === 'object') {
        for(var i = 0; i < ignoreParameters.length; i++)  {
        if(ignoreParameters.hasOwnProperty(i)) {
            url1 = exports.removeParameter(url1, ignoreParameters[i]);
            url2 = exports.removeParameter(url2, ignoreParameters[i]);
          }
        }
      }
      if (!hasTrailingSlash(url1)) {
        url1 += '/';
      }
      if (!hasTrailingSlash(url2)) {
        url2 += '/';
      }
      return url1 === url2;
    },

    isCurrent: function(url1, ignoreParameters) {
      return exports.isSame(url1, window.location.pathname, ignoreParameters);
    },

    load: function(url) {
      OLCS.stopEnableButton = true;
      window.location.href = url;
    },

    removeParameter: function (url, parameter) {
        var urlparts= url.split('?');
        if (urlparts.length>=2) {

            var prefix= encodeURIComponent(parameter)+'=';
            var pars= urlparts[1].split(/[&;]/g);

            //reverse iteration as may be destructive
            for (var i= pars.length; i-- > 0;) {
                //idiom for string.startsWith
                if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                    pars.splice(i, 1);
                }
            }

            url= urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : '');
            return url;
        } else {
            return url;
        }
    }

  };

  return exports;

}(document, $));
