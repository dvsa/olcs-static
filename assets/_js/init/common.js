OLCS.ready(function() {
  "use strict";

  // allow any links to opt-in to ajax modals
  OLCS.modalAjax({
    trigger: ".js-modal-ajax"
  });

  // initialise any check-all table checkboxes
  OLCS.tableCheckAll();

  OLCS.formInit();

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



  $("tr").each( function() {
   
    // If this has more than a single anchor link child element
    if ($(this).find("a").length === 1) {

      // On click of the table row take the user to the href
      // specified in the anchor
      $(this).click( function() {
        window.location = $(this).find("a").attr("href");
      })
      // And give these rows a hover class
      .hover( function() {
        $(this).toggleClass('hover');
      });
    }
  });

});
