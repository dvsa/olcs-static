require.config({
    baseUrl: 'js/lib',
    paths: {
        jquery: 'jquery.1.11.0'
    }
});

require(['jquery'], function( $ ) {
    console.log( $ );
});