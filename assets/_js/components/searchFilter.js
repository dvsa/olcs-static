var OLCS = OLCS || {};

/**
 * Search Filter
 *
 * Convert the search filter into an accordion-esque element
 * on smaller screens
 *
 * grunt test:single --target=searchFilter
 */

  OLCS.searchFilter = (function(document, $, undefined) {

  'use strict';

  return function init(custom) {

    var options = $.extend({
      parent  : '.search-filter',
      content : '.form__filter',
      title   : 'h3',
      class   : 'toggled',
      mobile  : '780px'
    }, custom);
      
    var title   = $(options.parent).find(options.title);
    var content = $(options.parent).find(options.content);
    
    function makeExpandable() {
      
      $(options.parent).removeClass(options.class);
      
      title.attr({
        'aria-expanded' : 'false',
        'aria-controls' : content.attr('id')
      });
      
      content.hide().attr({
        'aria-hidden' : 'true',
        'aria-labelledby' : title.attr('id')
      });
      
      title.click(function() {
        
        content.toggle();
        
        if (content.is(':visible')) {
          title.attr('aria-expanded', 'true');
          content.attr('aria-hidden', 'false');
        } else {
          title.attr('aria-expanded', 'false');
          content.attr('aria-hidden', 'true');
        }
        
        $(options.parent).toggleClass(options.class);
        
      });
      
    } // makeExpandable()
    
    function revert() {
      title.removeAttr('aria-expanded aria-controls');
      content.show().removeAttr('aria-hidden aria-labelledby');
      $(options.parent).removeClass(options.class);
      title.click(function() { return });
    }

    if (options.mobile) {
      if (window.matchMedia('(max-width: ' + options.mobile + ')').matches) makeExpandable(); else revert();
    } else {
      makeExpandable(); 
    }

  };

}(document, window.jQuery));