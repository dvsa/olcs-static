OLCS.ready(function() {
  "use strict";

  // allow any links to opt-in to ajax modals
  OLCS.modalAjax({
    trigger: ".js-modal-ajax"
  });

  OLCS.tableCheckAll();
  OLCS.tableRows();
  OLCS.checkboxes();
  OLCS.radioButtons();
  OLCS.formInit();
  OLCS.toggleHelp();

  /*
   * By default, opt-in to showing a preloader for
   * all AJAX requests. If this proves to be a bit greedy
   * we can make it more selective :)
   */
  $(document).bind("ajaxSend", function() {
    OLCS.preloader.show();
  }).bind("ajaxComplete", function() {
    OLCS.preloader.hide();
  });


});
