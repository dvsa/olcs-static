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
  OLCS.detailsElement();
  var F = OLCS.formHelper;

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

  // $(document).on("ajaxStart", function(){
  //   if (!$(".modal__wrapper").length && !$(".preloader").length) {

  //   }
  // });

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

  OLCS.formHandler({
    form: ".js-form-ajax-submit",
    onChange: false,
    disable: false,
    success: OLCS.normaliseResponse(function(data) {
      if (data.hasErrors) {
        F.render(".js-body", data.body);

        return;
      }
      OLCS.modalForm(data);
    })
  });

});
