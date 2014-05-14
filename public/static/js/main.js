var OLCS = OLCS || {};

$(function(){
	OLCS.hiddenFields.init();
	OLCS.ajaxModal.init('.modal','#main');
	OLCS.tooltips.init();
});

/** 
 *  Reveal form elements based on variable from inputs
 * 
 *  Todo: 
 *  • Refactor toogleFields
 *  • Add functionality to allow multiple values within a field name
 *  • Get field name from value
 *
 */

OLCS.hiddenFields = (function () {
		
	var scriptTag = $('#inline-js');

	function parseJSON () {	
		return hiddenFieldsList = JSON.parse(scriptTag.html()).hiddenFieldsList;
	}

	function hideFields () {
		$.each(hiddenFieldsList, function() {
			$('' + this.hiddenElement + '').hide();
			$('' + this.hiddenElement + ' input,' + this.hiddenElement + ' select').prop('disabled', true);
		});
	}

	function toggleFields () {
		$.each(hiddenFieldsList, function(e) {
			var $fieldName = $('[name="' + this.fieldName + '"]'),
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
        init: init
    };

})()



/**
 * 
 *  Ajax content into a modal window
 *
 *  Todo: 
 *  • Add proper toggling without ajax request if content is present
 *  • Abstract selectors into paramaters/conif
 *
 */


OLCS.ajaxModal = (function () {

	function hideModal () {
		$('.overlay, .modal__wrapper').hide();
	}

	function ajaxModalContent () {
		$('.js-modal').click(function(e){
			e.preventDefault();
			$.ajax({
				url: $(this).attr('href'),
				type: 'GET',
				success: function(data) {
					$('.modal').append($(data).find('#main'));
					$('.overlay, .modal__wrapper').show();
				}
			});
		});
	}

	function closeModal () {
		$('.modal__close').click(function(){
			$('.overlay, .modal__wrapper').hide();
		});
	}

	function init () {
		hideModal();
		ajaxModalContent();
		closeModal();
	}

    return {
        init: init
    };

})()

/**
 * 
 *  Show and hide tooltips
 *
 *  Todo: 
 *  • Add proper toggling without ajax request if content is present
 *  • Abstract selectors into paramaters/conif
 *
 */


OLCS.tooltips = (function () {

	var tparent = $('.tooltip').parent()

	function giveTooltipParentClass () {
		tparent.addClass('tooltip__parent');
	}

	function toogleTooltip () {
		tparent.hover(function(e) {
		var tparentLeft = $(this).offset().left - 20,
			tparentBottom = $(window).height() - ($(this).offset().top - $(window).scrollTop());

		  	$(this).find('span')
		  		.css({'left':''+ tparentLeft +'px','bottom':''+ tparentBottom +'px'}).fadeIn(100);
		}, 
		function() {
		   	$(this).find('span').removeClass('visible').fadeOut(20);
		});
	}

	function init () {
		giveTooltipParentClass();
		toogleTooltip();
	}

	return {
		tparent: tparent,
        init: init
    };

})()


