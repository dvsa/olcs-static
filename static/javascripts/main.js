$(document).ready(function() {
	toggleValidation();
});

function toggleValidation() {
	$('head').prepend('<style>.toggler { position: fixed; display: block; background: black; bottom: 0; right: 0; color: white; padding: 0.25em 0.5em; } </style>');
	$('body').prepend('<div class="toggler"><a href="#">Validation</a></div>');
	$('.toggler a').click(function(e) {
		e.preventDefault();
		$('.validation-wrapper, .validation-summary').toggle();
	});
}