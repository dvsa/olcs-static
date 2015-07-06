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

  OLCS.characterCount({
    selector: "textarea.js-financial-history"
  });

  OLCS.postcodeSearch({
    container: ".js-postcode-search"
  });


  /*
   * By default, opt-in to showing a preloader for
   * all AJAX requests. If this proves to be a bit greedy
   * we can make it more selective :)
   */
  $(document).bind("ajaxError", OLCS.preloader.hide);


  // A safe assumption that when the page is rendered
  // this preloader should be hidden
  OLCS.eventEmitter.on("render", function() {
    OLCS.preloader.hide();
  });

  // @TODO why don't we emit "render" here? It would
  // make things line up neatly between initial page render
  // and modal re-render etc

  OLCS.fileUpload({
    multiple: true
  });
});
