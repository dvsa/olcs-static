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
      content : '.form__filter',
      title   : 'h3',
      class   : 'toggled',
      mobile  : '780px'
    }, custom);
      
    var title   = $(options.parent).find(options.title);
    var content = $(options.parent).find(options.content);
    
    // Get the ID's of the elements of interest
    var titleID   = title.attr('id');
    var contentID = content.attr('id');
    
    function makeExpandable() {
      
      $(options.parent).removeClass(options.class);
      
      title.attr({
        'aria-expanded' : 'false',
        'aria-controls' : contentID
      });
      
      content.hide().attr({
        'aria-hidden' : 'true',
        'aria-labelledby' : titleID
      });
      
      title.click(function() {
        
        console.log('test');
        
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

    // Run the code on page load
    $(window).on('load', function() { 
      if (window.matchMedia('(max-width: ' + options.mobile + ')').matches) {
        makeExpandable(); 
      } else {
        revert();
      }
    });

  };

}(document, window.jQuery));