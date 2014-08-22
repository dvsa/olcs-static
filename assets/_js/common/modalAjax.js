var OLCS = OLCS || {};

/*
OLCS.modal.init({
  trigger: '.js-modal',
  selector: '.modal',
  content: '#main'
});
*/

OLCS.modalAjax = (function(document, $, undefined) {

  'use strict';

  /**
   * local variable declarations
   * and public export
   */
  var exports = {};

  /**
   * private interface
   */

  var cache = {};

  function show(data, content) {
    if (content) {
      data = $(data).find(content).html();
    }
    OLCS.modal(data);
  }

  /**
   * public interface
   */
  exports.init = function(options) {
    var trigger = options.trigger;

    $(document).on('click', trigger, function(e) {
      e.preventDefault();

      var key = $(this).attr('href');

      if (cache[key]) {
        return show(cache[key], options.content);
      }

      $.ajax({
        url: key,
        success: function(data) {
          cache[key] = data;
          show(data, options.content);
        }
      });
    });
  };

  return exports;

}(document, window.jQuery));
