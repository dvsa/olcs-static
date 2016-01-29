OLCS.ready(function() {
  "use strict";

  // allow any links to opt-in to ajax modals
  OLCS.modalLink({
    trigger: ".js-modal-ajax"
  });

  OLCS.tableCheckAll();
  OLCS.tableRows();
  OLCS.dataTooltip();
  OLCS.selectBox();
  OLCS.formInit();
  OLCS.notices();

  // OLCS.disableForm({
  //   submit: "[type=submit], .js-modal-ajax"
  // });

  // uses the jquery.details.min.js plugin to enhance <details>
  // element across browsers
  $("details").details();

  var F = OLCS.formHelper;

  OLCS.characterCount({
    selector: "textarea.js-financial-history"
  });

  OLCS.postcodeSearch({
    container: ".js-postcode-search"
  });

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

  OLCS.textareaPlaceholder();

});