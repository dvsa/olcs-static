var OLCS = OLCS || {};

/**
 * Add multiple
 *
 * Uses the Zend method for form collections, using the template generated instead of
 * just duplicating the fieldset as 'addAnother' does
 */
OLCS.addMultiple = (function (document, $) {
    'use strict';

    return function init(custom) {
        var options = $.extend({
            container: '.add-multiple',
            triggerSelector: '.hint input[type="submit"]',
            removeTriggerSelector: '.remove-link a',
            targetSelector: 'span[data-template]'
        }, custom);

        OLCS.eventEmitter.once('render', function () {
            // Run the plugin on each container
            $(options.container).each(function () {
                var container = $(this);
                var triggerSelector = container.find(options.triggerSelector);

                triggerSelector.on('click', function (e) {
                    var template = container.find(options.targetSelector).data('template');

                    var currentCount = container.find('> fieldset').length;
                    template = template.replace(/__index__/g, currentCount);

                    container.find(options.targetSelector).before(template);

                    e.preventDefault();
                });

                container.on('click', options.removeTriggerSelector, function(e) {
                    $(this).parents(options.container + ' > fieldset').remove();
                    e.preventDefault();
                });
            });
        });
    };
}(document, window.jQuery));
