define(["jquery"], function() {
	return {

		hideFields : function() {
			$.each(hiddenFieldsList, function() {
				$('' + this.hiddenElement + '').hide();
			});
		},

		toggleFields : function() {
			$.each(hiddenFieldsList, function(e) {
				var $fieldName = $('[name="' + this.fieldName + '"]'),
				$hiddenElement = $('' + this.hiddenElement + ''),
				fieldValue = this.fieldValue;
				$fieldName.change(function() {
					if ( $(this).val() === fieldValue ) {
						$hiddenElement.show();
					} else {
						$hiddenElement.hide();
					}
				});
			});
		},

		init : function() {
			this.hideFields();
			this.toggleFields();
		}

	}
});