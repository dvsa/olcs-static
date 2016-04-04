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
      mobile  : 780
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
      
    }
    
    function revert() {
      title.removeAttr('aria-expanded aria-controls');
      content.show().removeAttr('aria-hidden aria-labelledby');
      $(options.parent).removeClass(options.class);
      title.unbind();
    }
    
    // Get the actual width of the viewport (minus scrollbar)
    function viewport() {
      var e = window, a = 'inner';
      if (!('innerWidth' in window )) {
        a = 'client';
        e = document.documentElement || document.body;
      }
      return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
    }

    if (options.mobile) {
      var resizeTimer;
      $(window).on('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {  
          var windowsize = viewport().width;
          if (windowsize < options.mobile) {
            makeExpandable();
          }
          else {
            revert();
          }
        }, 500);
      }).resize();
    } else {
      makeExpandable(); 
    }

  };

}(document, window.jQuery));