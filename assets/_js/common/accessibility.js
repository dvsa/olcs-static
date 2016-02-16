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
    var inactivityTime = 4000;
    var countdownTimer = '#countdownTimer';
    var countdownAlert = '#countdownAlert';
    
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
     * Will probably move this to own JS component ultimately
     *
     * Alert a message to let users know that they will soon be automatically
     * logged out if they continue to be idle
     */
    
    // Cache the variable which will store allowed idle time remaining
    var idleTime;
    var timerSelector = countdownTimer.substring(1);
    var alertSelector = countdownAlert.substring(1);
    
    // Create the HTML content for the idle modal
    var idleTemplate = [
      '<p>Due to inactivity you will soon be automatically logged out. To remain logged in, simply dismiss this alert message.</p>',
      '<h2 id="' + timerSelector + '" data-seconds="32400">09:00:00</h2>',
      '<div id="' + alertSelector + '" role="alert" aria-live="assertive" class="visually-hidden"></div>',
      '<p><button class="action--primary" id="idlePopupDismiss">Dismiss</button></p>',
    ].join('\n');
    
    // Inject an updated countdown for screen readers every 60 seconds
    function countdownInject() {
      
      // Check each second whether the content needs updating 
      setTimeout(function(){ 
        
        // Update the content every minute
        setInterval(function() {
          
          // Get the current time left
          var timeLeft = $(countdownTimer).text();
          
          // Append to the hidden screen-reader div
          $(countdownAlert).html('Time Left To Save: ' + timeLeft);
          
        }, 1000 * 60); 
        
      }, 1000);
      
    }
    
    function counter() {
      
      // Each second update the visual countdown
      var updateCountdown = setInterval(function() {
          
        // Get the original total time of the countdown
        var seconds = $(countdownTimer).data('seconds');
        
        // If we still have some time left
        if (seconds > 0) {
          
          var second = seconds - 1;
          
          $(countdownTimer).data('seconds', second);
          
          var date = new Date(null);
          
          date.setSeconds(second); 
          
          $(countdownTimer).html(date.toISOString().substr(11, 8));
          
        } 
        
        // Or if we've run out of time
        else {
          $(countdownTimer).html('Logging Out...');
        }
        
      }, 1000);
      
      countdownInject();
      
      // We need to stop the setInterval from accumulating after each modal close
      OLCS.eventEmitter.on('hide:modal', function() {
        clearInterval(updateCountdown);
      });
      
    }

    // Function to appropriately show the idle modal
    function alertLogout() {
      // If a (read: the) modal is not already open
      if ($('.modal').length === 0) {
        // Open it
        OLCS.modal.show(
          idleTemplate, 'You will soon be logged out'
        );
        counter();
      }
    }

    // Function to reset the idle timer if user becomes un-idle
    function resetTimer() {
      clearTimeout(idleTime);
      idleTime = setTimeout(alertLogout, inactivityTime);
    }
    
    window.onload        = resetTimer; // reset on page load
    document.onmousemove = resetTimer; // reset if mouse moves
    document.onkeypress  = resetTimer; // reset if button pressed
    
    // reset if modal closes
    OLCS.eventEmitter.on('hide:modal', resetTimer);
    
    // Close modal on dismiss button click
    $('#idlePopupDismiss').click(function() {
      OLCS.modal.hide();
    });
    
  };

}(document, window.jQuery));