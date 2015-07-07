var OLCS = OLCS || {};

/**
 * OLCS.characterCount
 *
 * Displays a character count below a field
 *
 */

OLCS.characterCount = (function(document, $, undefined) {

  'use strict';

  return function init(options) {

    var selector = options.selector;
    var count    = $(selector).val() ? $(selector).val().replace(/ /g,'').length: 0;
    var template = '<span class="character-count">'+count+' characters</span>';

    $(template).insertAfter(selector);

    $(selector).keyup(function() {
      count = $(selector).val().replace(/ /g,'').length;
      $('.character-count').text(count+' characters');
    });

  };

}(document, window.jQuery));
