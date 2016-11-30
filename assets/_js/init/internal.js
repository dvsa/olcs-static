OLCS.ready(function() {
  'use strict';

  OLCS.conditionalButton({
    form: '.table__form',
    selector: '.js-require--one:not(.js-force-disable)',
    predicate: function(length, callback) {
      callback(length === 1);
    }
  });

  OLCS.conditionalButton({
    form: '.table__form',
    selector: '.js-require--multiple:not(.js-force-disable)',
    predicate: function(length, callback) {
      callback(length >= 1);
    }
  });

  OLCS.toggleElement({
    triggerSelector: '.admin__title',
    targetSelector: '.admin__menu'
  });

  OLCS.wysiwyg();
  
});
