$(function() {
  "use strict";

  /*
   * By default, opt-in to showing a preloader for
   * all AJAX requests. If this proves to be a bit greedy
   * we can make it a bit more selective :)
   */
  $(document).bind("ajaxSend", function() {
    OLCS.preloader.show();
  }).bind("ajaxComplete", function() {
    OLCS.preloader.hide();
  });
});
