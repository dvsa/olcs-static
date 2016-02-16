var OLCS = OLCS || {};

/**
 * OLCS.accessibility
 *
 * Various tools and helpers to aid with accessibility
 * 
 * grunt test:single --target=accessibility
 */

  OLCS.accessibility = (function(document, $, undefined) {

  'use strict';

  return function init() {
    
    var errorContainer      = '#validationSummary';
    var skipTrigger         = '#skipToContent';
    var skipTarget          = '#main';
    var inputLabels         = '[type="radio"], [type="checkbox"], [type="file"]';
    
    /**
     * Validation Error Messages
     *
     * Automatically set focus to and scroll to form errors
     */
  
    // Make error messages container focusable and set focus
    $(errorContainer).attr('tabIndex', -1).focus();
    
    // Scroll to the error messages
    window.location.hash = errorContainer;
    
    /** 
     * Input labels
     * 
     * Allows focus to be given to label elements which contain child
     * input elements, and removes ability to focus on said child elements 
     * to prevent double tabbing
     */
    
    // Make input labels focusable with the tab key
    $('label').has(inputLabels).attr('tabindex', 0);
    
    // Prevent child inputs from being tab-able
    $('label').find(inputLabels).attr('tabindex', -1);
    
    /**
     * Skip To Main Content
     *
     * Gives focus to the content that is "skipped" to using the
     * skipToContent accessibility link
     * 
     * https://code.google.com/p/chromium/issues/detail?id=262171
     * http://stackoverflow.com/questions/6280399/skip-links-not-working-in-chrome
     */
    
    $(skipTrigger).click(function () {
      $(skipTarget).attr('tabIndex', -1).focus();
    });
    
  };

}(document, window.jQuery));