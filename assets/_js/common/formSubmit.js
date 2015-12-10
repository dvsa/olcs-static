var OLCS = OLCS || {};

/**
 * OLCS.formSubmit
 * 
 * @author: edmund.reed@valtech.co.uk, Valtech Ltd
 * @description: Tools to provide disabling buttons and changing submit button 
 * text when form is submitted
 * 
 */

OLCS.formSubmit = (function(document, $, undefined) {

  'use strict';

  return function init(options) {
    
    // Get the selectors of interest
    var $form = options.form;
    var $submit = options.submit;
    
    // Set appropriate button replacement message
    // If clicked element has attirbute 'data-onclick-become',
    // use that, otherwise use the default message
    var $dataLoadText = $($submit).attr('data-onclick-become');
    var $loadText = $dataLoadText ? $dataLoadText : options.loadText;
    
    // Iterate through each occurance
    $($form).each(function() {
      
      // When a submit button is clicked
      $($submit).on('click', function() {
        
        // Disable all the submit buttons in the current form
        $($submit).addClass('disabled');
        
        // Replace the clicked button text with an appropriate message
        // If no message is set, the button text will remain as normal
        if ($loadText !== undefined) {
          $(this).html($loadText);
        }
        
      });
      
    });
    
  };

}(document, window.jQuery));