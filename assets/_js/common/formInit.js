var OLCS = OLCS || {};

/**
 * OLCS.formInit
 *
 * Ideally this wouldn't exist; we only need it to bootstrap
 * our chosen styling. Worth looking at moving this into
 * init/common.js instead...
 */
OLCS.formInit = (function(document, $, undefined) {

  'use strict';

  return function init() {
    
    function setup() {
      //$('.chosen-select-medium').select2({ width: '53%' });
      //$('.chosen-select-large').select2({ width: '97%' });
      $('.chosen-select-medium').chosen({ width: '53%' });
      $('.chosen-select-large').chosen({ width: '97%' });
    }

    OLCS.eventEmitter.on('render', setup);
    
  };

}(document, window.jQuery));
