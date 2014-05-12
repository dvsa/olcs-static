require.config({
    paths: {
        jquery: '/js/lib/jquery.1.11.0'
    }
});

require(['module/hiddenFields'], function(hiddenFields) {

	hiddenFields.init();

});