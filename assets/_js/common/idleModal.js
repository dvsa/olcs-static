var OLCS = OLCS || {};

/**
 * OLCS.idleModal
 *
 * Alert a message to let users know that they will soon be automatically
 * logged out if they continue to be idle
 * 
 * grunt test:single --target=idleModal
 */

  OLCS.idleModal = (function(document, $, undefined) {

  'use strict';

  return function init() {
    
    // Options
    var inactivityTime      = 4.06; // minutes
    var inactivityRemaining = 4; // minutes
    var countdownTimer      = '#countdownTimer';
    var countdownAlert      = '#countdownAlert';
    var modalTitle          = 'You will soon be logged out';
    var modalMessage        = 'Due to inactivity you will soon be automatically logged out. To remain logged in, simply dismiss this alert message.';
    var dismissMessage      = 'Dismiss';
    var alertMessage        = 'Time Left To Save';
    var loggingOutMessage   = 'Logging Out...';
    
    // Convert the passed time's to appropriate units
    inactivityTime = inactivityTime - inactivityRemaining;
    inactivityTime = inactivityTime * 1000 * 60;
    inactivityRemaining = inactivityRemaining * 60;
    
    // Cache the variable which will store allowed idle time remaining
    var idleTime;
    
    // Get the raw selectors to render the HTML
    var timerSelector = countdownTimer.substring(1);
    var alertSelector = countdownAlert.substring(1);
    
    // Convert the inactivity remaining time (minutes) into HH:MM:SS
    var totalSec = inactivityRemaining;
    var hours = parseInt(totalSec/3600) % 24;
    var minutes = parseInt(totalSec/60) % 60;
    var seconds = totalSec % 60;
    var result = (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds  < 10 ? '0' + seconds : seconds);
    
    // Create the HTML content for the idle modal
    var idleTemplate = [
      '<p>' + modalMessage + '</p>',
      '<h2 id="' + timerSelector + '" data-seconds="' + inactivityRemaining + '">' + result + '</h2>',
      '<div id="' + alertSelector + '" role="alert" aria-live="assertive" class="visually-hidden"></div>',
      '<p><button class="action--primary" id="idlePopupDismiss">' + dismissMessage + '</button></p>'
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
          $(countdownAlert).html(alertMessage + ' : ' + timeLeft);
          
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
          
        } else {
          $(countdownTimer).html(loggingOutMessage);
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
      // If a (read: the) modal is not already open, open it
      if ($('.modal').length === 0) {
        OLCS.modal.show(
          idleTemplate, modalTitle
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