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
  
  OLCS.eventEmitter.on("render", function() {
    // A safe assumption that when the page is rendered
    // this preloader should be hidden
    OLCS.preloader.hide();
    // Call the plugin to improve select dropdowns
    //$('.chosen-select-medium').select2({ width: '53%' });
    //$('.chosen-select-large').select2({ width: '97%' });
    $('.chosen-select-medium').chosen({ width: '53%' });
    $('.chosen-select-large').chosen({ width: '97%' });
  });

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