var OLCS = OLCS || {};

OLCS.radioButton = (function(document, $, undefined) {

  'use strict';

  var exports = {};

  exports.initialize = function() {
    $('[data-show-element]').change(exports.showHide);
  };



  exports.showHide = function(e){
    var elements = $('[data-show-element]');

    elements.each(function(e){
      var target = this.getAttribute('data-show-element'),
          show = $(this).is(':checked');
      $(target).toggle(show); 
    });
  };

  return exports;

}(document, window.jQuery));
