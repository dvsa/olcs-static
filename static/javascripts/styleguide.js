$(document).ready(function() {
	var title = $(document).attr('title');
	if (title==='Form elements') {
		toggleValidation();
	}
	if (title=='Alerts' || title=='Modal form js' || title=='Modal table js') {
		toggleOverlay();
	}
});

function toggleValidation() {
	$('head').prepend('<style>.toggler { position: fixed; display: block; background: black; bottom: 0; right: 0; color: white; padding: 0.25em 0.5em; } .toggler a {color: white;} </style>');
	$('body').prepend('<div class="toggler"><a href="#">Validation</a></div>');
	$('.toggler a').click(function(e) {
		e.preventDefault();
		$('.validation-wrapper, .validation-summary').toggle();
	});
}

function toggleOverlay() {
	$('input, .button--primary--large, .modal__close').click(function(e) {
		e.preventDefault();
		$('.overlay, .modal__wrapper, .alert__wrapper').toggle();
	});
}