OLCS.ready(function() {
  "use strict";

  // allow any links to opt-in to ajax modals
  OLCS.modalAjax({
    trigger: ".js-modal-ajax"
  });

  OLCS.tableCheckAll();
  OLCS.tableRows();
  OLCS.selectBox();
  OLCS.formInit();
  OLCS.notices();

  OLCS.fileUploader({
    selector: "#aiFileUploader",
    isMultiple: false
  });

  OLCS.fileUploader({
    selector: "#feFileUploader",
    isMultiple: true
  });

  OLCS.postcodeSearch({
    container: ".js-postcode-search"
  });

  /*
   * By default, opt-in to showing a preloader for
   * all AJAX requests. If this proves to be a bit greedy
   * we can make it more selective :)
   */
  $(document)
  .bind("ajaxSend", OLCS.preloader.show)
  .bind("ajaxComplete", OLCS.preloader.hide);

});
