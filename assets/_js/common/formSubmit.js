var OLCS = OLCS || {};

/**
 * OLCS.formSubmit
 * 
 * Tools to provide disabling buttons and changing submit button 
 * text when form is submitted
 * 
 */

OLCS.formSubmit = (function(document, $, undefined) {

  'use strict';

  return function init(options) {
    
    // Get the selectors of interest
    var $form = options.form;
    var $submit = options.submit;
    
    // Create a variable to store the submit button text
    var $submitText;
        
    // Iterate through each occurance
    $($form).each(function() {
      
      // Cache each individual form
      var $thisForm = $(this);
      
      // When a submit button is clicked
      $($submit).unbind().on('click', function() {
    
        // Set appropriate button replacement message
        // If clicked element has attirbute 'data-onclick-become',
        // use that, otherwise use the default message
        var $dataLoadText = $(this).attr('data-onclick-become');
        var $loadText = $dataLoadText ? $dataLoadText : options.loadText;
        
        // Add class to identify the clicked submit button
        $(this).addClass('submit-clicked');
        
        // Cache the clicked button's original text
        $submitText = $(this).html();
        
        // Disable all the submit buttons in the current form
        $thisForm.find($submit).addClass('disabled');
        
        // Replace the clicked button text with an appropriate message
        // If no message is set, the button text will remain as normal
        if ($loadText !== undefined) {
          if ($(this).is('button', 'a')) {
            $(this).html($loadText);
          } else if ($(this).is('input')) {
            $(this).val($loadText);
          }
        }
        
      });
      
      // Revert buttons to their original state
      function revertFormSubmit() {
        
        // Re-enable all the submit buttons in the current form
        $($submit).removeClass('disabled');
        
        // Replace the loading text with the original text
        $('.submit-clicked').html($submitText).removeClass('submit-clicked');
        
      }
      
      // If submitting the form opens a modal instead of loading a new 
      // page, we need to revert the buttons to their original state,
      // ready for when the modal closes   
      OLCS.eventEmitter.on('show:modal', revertFormSubmit);
      
    });
    
  };

}(document, window.jQuery));