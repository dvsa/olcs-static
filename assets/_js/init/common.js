OLCS.ready(function() {
  "use strict";

  // allow any links to opt-in to ajax modals
  OLCS.modalAjax({
    trigger: ".js-modal-ajax"
  });

  /**
   * Controls within the table form
   */

  // for now we assume two things:
  // 1) The edit button is always called 'Edit'
  // 2) We always want to disable mutliple edits
  //
  // Neither of the above may always be true. As soon as they're
  // not, please modify this component to look for more generic
  // attributes, and modify the table builder backend logic so
  // we can opt-in to this behaviour easily
  OLCS.conditionalButton({
    selector: ".js-require-one",
    predicate: function(length, callback) {
      callback(length !== 1);
    }
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
  .bind("ajaxComplete", OLCS.preloader.hide);

});
