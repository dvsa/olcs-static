define(["jquery"], function() {
	return {

		parseJSON : function() {
			var scriptTag = $('#inline-js');
			return hiddenFieldsList = JSON.parse(scriptTag.html()).hiddenFieldsList;
		},

		hideFields : function() {
			this.parseJSON();
			$.each(hiddenFieldsList, function() {
				$('' + this.hiddenElement + '').hide();
				$('' + this.hiddenElement + ' input,' + this.hiddenElement + ' select').prop('disabled', true);
			});
		},

		toggleFields : function() {
			$.each(hiddenFieldsList, function(e) {
				var $fieldName 
				= $('[name="' + this.fieldName + '"]'),
					$hiddenElement = $('' + this.hiddenElement + ''),
					fieldValue = this.fieldValue,
					listLength = hiddenFieldsList.length;

				$fieldName.change(function() {
					if ( $(this).val() === fieldValue ) {
						$hiddenElement.show();
						$hiddenElement.find('select, input').removeAttr('disabled');
					} else {
						for (var i = e; i < listLength; i++) {
							$('' + hiddenFieldsList[i].hiddenElement + '').hide();
							$('' + hiddenFieldsList[i].hiddenElement + ' input').prop('checked', false)
								.prop('disabled', true);
							$('' + hiddenFieldsList[i].hiddenElement + ' select').val('')
								.prop('disabled', true);
						}
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