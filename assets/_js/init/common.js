OLCS.ready(function() {
  "use strict";

  // allow any links to opt-in to ajax modals
  OLCS.modalLink({
    trigger: ".js-modal-ajax"
  });

  OLCS.tableCheckAll();
  OLCS.tableRows();
  OLCS.selectBox();
  OLCS.formInit();
  OLCS.notices();

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
  .bind("ajaxSuccess", OLCS.preloader.hide)
  .bind("ajaxError", OLCS.preloader.hide);

  // @TODO why don't we emit "render" here? It would
  // make things line up neatly between initial page render
  // and modal re-render etc

  OLCS.fileUpload({
    multiple: true
  });
});
