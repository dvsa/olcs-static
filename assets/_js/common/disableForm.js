var OLCS = OLCS || {};

/**
 * OLCS.disableForm
 *
 * Tools to provide disabling buttons and changing submit button
 * text when form is submitted
 *
 */

OLCS.disableForm = (function(document, $, undefined) {

  'use strict';

  return function init(options) {

<<<<<<< HEAD
    // Get the selectors of interest
    var submit = options.submit;

    // Create a variable to store the submit button text
    var submitText;

    function disableFormSubmit() {

      // When a submit button is clicked
      $(submit).on('click', function() {

        var thisForm = $(this).parents('form:first');

        // Set appropriate button replacement message
        // If clicked element has attirbute 'data-onclick-become',
        // use that, otherwise use the default message
        var dataLoadText = $(this).attr('data-onclick-become');
        var loadText = dataLoadText ? dataLoadText : options.loadText;

        // Add class to identify the clicked submit button
        $(this).addClass('submit-clicked');

        // Cache the clicked button's original text
        submitText = $(this).html();

        // Disable all the submit buttons in the current form,
        // only after the form has actually been submitted
        $(thisForm).submit(function() {
          thisForm.find(submit).addClass('disabled').prop('disabled', true);
        });

        // Replace the clicked button text with an appropriate message
        // If no message is set, the button text will remain as normal
        if (loadText !== undefined) {
          if ($(this).is('button', 'a')) {
            $(this).html(loadText);
          } else if ($(this).is('input')) {
            $(this).val(loadText);
          }
        }

      });

    }

    // Revert buttons to their original state
    function revertFormSubmit() {

      // Re-enable all the submit buttons in the current form
      $(submit).removeClass('disabled').prop('disabled', false);

      // Replace the loading text with the original text
      $('.submit-clicked').html(submitText).removeClass('submit-clicked');

    }

    // Ensure the function will always work on page re-rendering
    OLCS.eventEmitter.on('render', disableFormSubmit);
=======

    OLCS.logger.debug(options);

    // Get the selectors of interest
    // var submit = options.submit;

    // // Create a variable to store the submit button text
    // var submitText;

    // function disableFormSubmit() {

    //   // When a submit button is clicked
    //   $(submit).on('click', function() {

    //     var thisForm = $(this).parents('form:first');

    //     // Set appropriate button replacement message
    //     // If clicked element has attirbute 'data-onclick-become',
    //     // use that, otherwise use the default message
    //     var dataLoadText = $(this).attr('data-onclick-become');
    //     var loadText = dataLoadText ? dataLoadText : options.loadText;

    //     // Add class to identify the clicked submit button
    //     $(this).addClass('submit-clicked');

    //     // Cache the clicked button's original text
    //     submitText = $(this).html();

    //     // Disable all the submit buttons in the current form,
    //     // only after the form has actually been submitted
    //     $(thisForm).submit(function() {
    //       thisForm.find(submit).addClass('disabled').prop('disabled', true);
    //     });

    //     // Replace the clicked button text with an appropriate message
    //     // If no message is set, the button text will remain as normal
    //     if (loadText !== undefined) {
    //       if ($(this).is('button', 'a')) {
    //         $(this).html(loadText);
    //       } else if ($(this).is('input')) {
    //         $(this).val(loadText);
    //       }
    //     }

    //   });

    // }

    // Revert buttons to their original state
    // function revertFormSubmit() {

    //   // Re-enable all the submit buttons in the current form
    //   $(submit).removeClass('disabled').prop('disabled', false);

    //   // Replace the loading text with the original text
    //   $('.submit-clicked').html(submitText).removeClass('submit-clicked');

    // }

    // Ensure the function will always work on page re-rendering
    // OLCS.eventEmitter.on('render', disableFormSubmit);
>>>>>>> 42ab6f1c4c143a4bdbdb8c3462edbcc406ba0eb7

    // If submitting the form opens a modal instead of loading a new
    // page, we need to revert the buttons to their original state,
    // ready for when the modal closes
<<<<<<< HEAD
    OLCS.eventEmitter.on('show:modal', revertFormSubmit);
=======
    // OLCS.eventEmitter.on('show:modal', revertFormSubmit);
>>>>>>> 42ab6f1c4c143a4bdbdb8c3462edbcc406ba0eb7

  };

}(document, window.jQuery));