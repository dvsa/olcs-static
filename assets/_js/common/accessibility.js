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
    
    var errorContainer = '#validationSummary';
    var skipTrigger    = '#skipToContent';
    var skipTarget     = '#main';
    var inputLabels    = '[type="radio"], [type="checkbox"], [type="file"]';
    var inactivityTime = 1000
    
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
    
    /**
     * Auto-Logout Countdown
     *
     * Alert a message to let users know that they will soon be automatically
     * logged out if they continue to be idle
     */
    
    // Check each second whether the content needs updating 
    setTimeout(function(){ 
      
      // Update the content every minute
      setInterval(function() {
        
        // Get the current time left
        var timeLeft = $('#timer').text();
        
        // Append to the hidden screen-reader div
        $('#alert').html("Time Left To Save: " + timeLeft);
        
      }, 1000 * 60); 
      
    }, 1000);

    // Each second update the visual countdown
    setInterval(function(){
      
      // For whatever reason there might be more than one countdown
      $(".countdown").each(function(){
        
        // Get the original total time of the countdown
        var seconds = $(this).data('seconds');
        
        // If we still have some time left
        if (seconds > 0) {
          
          // No idea why 0.5 is needed instead of 1, but it works...
          var second = seconds - 0.5;
          
          $(this).data('seconds', second);
          var date = new Date(null);
          date.setSeconds(second); 
          $(this).html(date.toISOString().substr(11, 8));
          
        } 
        
        // Or if we've run our of time
        else {
          $(this).html('Logging Out...');
        }
        
      });
      
    }, 1000);
    
    // Cache the variable which will store allowed idle time remaining
    var time;
    
    // Create the HTML content for the idle modal
    var idleTemplate = [
      'Due to inactivity you will soon be automatically logged out. To remain logged in, simply dismiss this alert message.',
      '<div id="timer" data-seconds="32400" class="countdown">09:00:00</div>',
      '<div id="alert" role="alert" aria-live="assertive" class="visually-hidden"></div>'
    ].join('\n');

    // Function to appropriately show the idle modal
    function alertLogout() {
      // If a (read: the) modal is not already open
      if ($('.modal').length === 0) {
        // Open it
        OLCS.modal.show(
          idleTemplate, 
          'You will soon be logged out'
        );
      }
    }

    // Function to reset the idle timer if user becomes un-idle
    function resetTimer() {
      clearTimeout(time);
      time = setTimeout(alertLogout, inactivityTime)
    }
    
    window.onload        = resetTimer; // reset on page load
    document.onmousemove = resetTimer; // reset if mouse moves
    document.onkeypress  = resetTimer; // reset if button pressed
    
    // reset if modal closes
    OLCS.eventEmitter.on('hide:modal', resetTimer);
    
  };

}(document, window.jQuery));