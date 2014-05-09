require.config({
    paths: {
        jquery: '/js/lib/jquery.1.11.0'
    }
});

require(['module/hiddenFields'], function(hiddenFields) {

	hiddenFieldsList = [
	    {
	        "fieldName": "gender",
	        "fieldValue": "female",
	        "hiddenElement": "#favourite-colour-field"
	    },
	    {
	        "fieldName": "favourite-colour",
	        "fieldValue": "green",
	        "hiddenElement": "#favourite-month-field"
	    }
	];

	hiddenFields.init();

});