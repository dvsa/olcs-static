var OLCS = OLCS || {};

/*
 * Progressively reveals elements based on form element change actions
 */

OLCS.hiddenFields = (function () {
		
	var scriptTag = $('#inline-js');

	function parseJSON () {	
		return json = JSON.parse(scriptTag.html()).hiddenFieldsList;
	}

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
		if (!scriptTag.length) {
			return false;
		} else {
			parseJSON();
			hideFields();
			toggleFields();
		}	
	}

    return {
        init: init,
        scriptTag: scriptTag,
        parseJSON: parseJSON,
        hideFields: hideFields,
        toggleFields: toggleFields
    };

})()



/*
 * Removes string from form labels"
 */

// OLCS.removeString = (function () {


// 	function checkForString () {
// 		$('label, legend').each(function() {
// 		  	var string = $(this).text();
// 		    string = string.replace(/\(if applicable\)/, '');
// 		    $(this).text(string);
// 		});
// 	}

// 	function init () {
// 		checkForString();
// 	}

//     return {
//     	init: init,
//     	checkForString: checkForString
//     };

// })()



$(function(){
	OLCS.hiddenFields.init();
	// removeString.init();
});
