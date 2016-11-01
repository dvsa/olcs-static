var OLCS = OLCS || {};

/**
 * Character count
 *
 * Displays a character count below a field
 */

OLCS.characterCount = (function(document, $, undefined) {

  'use strict';

  return function init(options) {

    var selector = options.selector;
    var count = $(selector).val() ? $(selector).val().replace(/ /g,'').length: 0;
    var charactersText = $(selector).attr('x-js-hint-chars-count') || 'characters';
    var template = '<div class="hint character-count">' + count + ' ' + charactersText + '</div>';

    $(template).insertAfter(selector);

    $(selector).keyup(function() {
      count = $(selector).val().replace(/ /g,'').length;
      $('.character-count').text(count + ' ' + charactersText);
    });

  };

}(document, window.jQuery));
