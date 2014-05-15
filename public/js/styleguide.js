define([], function () { /*some email validator function*/ });


// $( document ).ready(function() {

// 		$('.row').css({'width':'100%','overflow':'auto', 'margin-bottom': '2.5em'});
// 		var docUrl = document.location.href;

// 		if (docUrl.indexOf('form-elements') > -1) {
// 			toggleValidation();
// 		}
// 		else if (docUrl.indexOf('alert') > -1) {
// 			toggleOverlay();
// 		}
// 		else if (docUrl.indexOf('layouts') > -1) {
// 			layoutStyles();
// 		}
// 		else if (docUrl.indexOf('popup-table') > -1) {
// 			ajaxModal('/styleguide/popup-table-no-js','.modal','#main');
// 			toggleOverlay();
// 		}
// 		else if (docUrl.indexOf('popup-form') > -1) {
// 			ajaxModal('/styleguide/popup-form-no-js','.modal','#main');
// 			toggleOverlay();
// 		}
// 		else if (docUrl.indexOf('operating-centres') > -1) {
// 			modal('.modal','#main');
// 		}
// 		else if (docUrl.indexOf('compliance') > -1) {
// 			showHide('.case-summary__toggle','.case-summary__list');
// 			$('body').addClass('internal');
// 		}
// 		else if (docUrl.indexOf('form-js') > -1) {
// 			validation();
// 		}
// });






// 	/*
// 	 * Toggle validation styling on and off
// 	 */

// 	function toggleValidation() {
// 		$('body').prepend('<style>.toggler { position: fixed; display: block; background: black; bottom: 0; right: 0; color: white; padding: 0.25em 0.5em; } .toggler a {color: white;} </style><div class="toggler"><a href="#">Validation</a></div>');
// 		$('.toggler a').click(function(e) {
// 			e.preventDefault();
// 			$('.validation-wrapper, .validation-summary').toggle();
// 		});
// 	}


// 	/*
// 	 * Toggle overlay visibility
// 	 */

// 	function toggleOverlay() {
// 		$('input, .button--primary--large, .modal__close').click(function(e) {
// 			e.preventDefault();
// 			$('.overlay, .modal__wrapper, .alert__wrapper').toggle();
// 		});
// 	}


// 	/*
// 	 * Styling for layout page in the styleguide
// 	 */

// 	function layoutStyles() {
// 		$('.full-width, .one-quarter, .one-third, .two-thirds, .three-quarters, .one-half').css({'background':'#d5d5d5','height':'200px', 'margin-bottom':'5%'});
// 	}





// 	function ajaxModal(url,$targetEl,$fragmentEl) {
// 		$.ajax({
// 			url: url,
// 			type: 'GET',
// 			success: function(data) {
// 				$($targetEl).append($(data).find($fragmentEl));
// 			}
// 		});
// 	}


	/*
	 * Generic Ajax overlay function
	 */

	function modal($targetEl,$fragmentEl) {
		// Hide the overlay on load
		$('.overlay, .modal__wrapper').hide();

		$('.js-modal').click(function(e){
			e.preventDefault();

			// Ajax request
			$.ajax({
				url: $(this).attr('href'),
				type: 'GET',
				success: function(data) {
					$($targetEl).append($(data).find($fragmentEl));
					$('.overlay, .modal__wrapper').show();
				}
			});
		});

		// Close the modal
		$('.modal__close').click(function(){
			$('.overlay, .modal__wrapper').hide();
		});
	}






// 	/*
// 	 * Generic show & hide 
// 	 */

// 	function showHide($target,$element) {
// 		$($target).click(function(e) {
// 			e.preventDefault();
// 			$($element).toggle();
// 		});
// 	}


// 	/*
// 	 * Validation
// 	 */

// 	function validation() {

// 		$('#form--sign-up').validate({
// 			debug: true,
// 			errorLabelContainer: 'validation-wrapper',
// 			wrapper: 'ul class="validation-wrapper__message"',
// 			errorElement:'li',
// 			errorPlacement: function(error, element) {
// 				error.insertBefore(element.parent('.field'));
// 				$('.validation-wrapper__message').next('.field').andSelf().wrapAll('<div class="validation-wrapper"/>');
// 			},
// 			rules: {
// 				'address[line-1]': {
// 					required: true,
// 					minlength: 2,
// 					maxlength: 5
// 				},
// 				'gender': {
// 					required: true
// 				}
// 			},
// 			messages: {
// 				'address[line-1]': {
// 					required: 'Please enter the first line in your address',
// 				}
// 			}
// 		});
// 	}












