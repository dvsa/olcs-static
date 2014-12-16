OLCS.ready(function() {
  "use strict";

  var F = OLCS.formHelper;

  $(document).on("click", ".table__header button", function(e) {
    e.preventDefault();

    var form   = $(this).parents("form");
    var button = $(this);

    F.pressButton(form, button);
    OLCS.formAjax({
      form: form,
      success: OLCS.normaliseResponse(function(data) {
        if ($("<div>").html(data.body).find(".validation-summary").length) {
          $("body .js-body").html(data.body);
        } else {
          OLCS.formModal(data);
        }
      })
    });
  });
});
