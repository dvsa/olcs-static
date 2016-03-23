var OLCS = OLCS || {};

/**
 * Search Filter
 *
 * Convert the search filter into an accordion-esque element
 * on smaller screens
 */

  OLCS.searchFilter = (function(document, $, undefined) {

  'use strict';

  return function init(custom) {

    var options = $.extend({
      parent  : '.search-filter',
      title   : 'h3',
      content : '.form__filter',
      mobile  : 780
    }, custom);
    
    function makeExpandable() {
      $(options.parent).find(options.content).hide();
      $(options.title).click(function() {
        $(options.content).toggle();
      });
    }
    
    function revert() {
      $(options.parent).find(options.content).show();
      $(options.title).click(function() {
        return;
      });
    }

    // Run the code on page load & resize
    $(window).on('load resize', function() {
      if (($(document).width()) < options.mobile) {
        makeExpandable();
      } else {
        revert();
      }
    });

  };

}(document, window.jQuery));