
var hiddenFields = (function () {

	var scriptTag = $('#inline-js'),
		json = JSON.parse(scriptTag.html()).hiddenFieldsList;

	function hideFields () {
		$.each(json, function() {
			$('' + this.hiddenElement + '').hide();
		});
	}

	function toggleFields () {
		$.each(json, function(e) {
			var $fieldName = $('[name="' + this.fieldName + '"]'),
			$hiddenElement = $('' + this.hiddenElement + ''),
			fieldValue = this.fieldValue;

			$fieldName.change(function() {
				if ( $(this).val() === fieldValue ) {
					$hiddenElement.show();
				} else {
				}
			});
		});
	}

	function init () {
		if (scriptTag.length) {
			hideFields();
			toggleFields();
		} else {
			return false;
		}
	}

    return {
        scriptTag: scriptTag,
        init: init,
        json: json
    };

})()


$(function(){
	hiddenFields.init();
});
