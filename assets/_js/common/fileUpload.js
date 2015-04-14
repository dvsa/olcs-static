var OLCS = OLCS || {};

/**
 * OLCS.fileUpload
 *
 */

OLCS.fileUpload = (function(document, $, undefined) {

  "use strict";

  if (window.FormData === undefined) {
    OLCS.logger.warn("XHR form uploads not supported in this browser", "fileUpload");
    return;
  }

  return function init() {

    var F = OLCS.formHelper;
    var containerSelector = ".file-uploader";
    var inputSelector     = ".attach-action__input";
    var removeSelector    = ".file__remove";
    var mainBodySelector  = ".js-body";
    var numUploaded       = 0;
    var totalUploads      = 0;

    var handleResponse = OLCS.normaliseResponse(function(response) {
      if (OLCS.modal.isVisible()) {
        OLCS.modal.updateBody(response.body);
      } else {
        F.render(mainBodySelector, response.body);
      }
    });

    function upload(form, name, index, file) {
      OLCS.logger.debug(
        "Uploading file " + file.name + " (" + file.type + ")",
        "fileUpload"
      );

      var kbSize = Math.round(file.size / 1024);
      $(".js-upload-list").append([
        "<li class=file data-upload-index=" + index + ">",
          "<p>",
            "<a href=#>",
              file.name,
            "</a>",
            "<span>",
              kbSize + "KB",
            "</span>",
          "</p>",
          "<span class=file__remove>Uploading...</span>",
        "</li>"
      ].join("\n"));

      var xhr = new XMLHttpRequest();
      // make sure we take the form data as it stands to support
      // partially filled in forms
      var fd = new FormData(form.get(0));

      /*
      xhr.upload.addEventListener("progress", function(e) {
        var pc = Math.round((e.loaded * 100) / e.total);
        // here if we want to use it...
      });
      */

      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          numUploaded ++;
          OLCS.logger.debug(
            "File " + numUploaded + "/" + totalUploads + " complete",
            "fileUpload"
          );

          $("[data-upload-index=" + index + "]")
          .find(".file__remove")
          .replaceWith("<a href=# class=file__remove>Remove</a>");

          if (numUploaded === totalUploads) {
            OLCS.logger.debug(
              "All files uploaded",
              "fileUpload"
            );
            handleResponse(xhr.responseText);
            OLCS.preloader.hide();
          }
        }
      };

      fd.append(name + "[file-controls][file]", file);
      fd.append(name + "[upload]", "Upload");

      xhr.open(
        form.attr("method"),
        form.attr("action"),
        // third param is async yes/no
        true
      );

      // we don't yet listen out for this header server
      // side, but let's provide it anyway in case the backend
      // ever becomes interested in the way we uploaded the file
      xhr.setRequestHeader("X-Inline-Upload", true);
      xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

      // off we go...
      setTimeout(function() {
        xhr.send(fd);
      }, index * 250);
    }

    $(document).on("change", inputSelector, function(e) {
      e.preventDefault();
      e.stopPropagation();

      var form  = $(this).parents("form");
      var name  = $(this).parents(containerSelector).data("group");
      var files = e.target.files;

      OLCS.logger.debug("Uploading " + files.length + " file(s)");

      numUploaded = 0;
      totalUploads = files.length;

      // we don't actually want to do this; it's just a temporary
      // way of showing that something's happening
      OLCS.preloader.show();

      $.each(files, function(index, file) {
        upload(form, name, index, file);
      });
    });

    $(document).on("click", removeSelector, function(e) {
      e.preventDefault();

      var button = $(this);
      var form   = $(this).parents("form");

      F.pressButton(form, button);

      OLCS.submitForm({
        form: form,
        success: handleResponse
      });
    });
  };

}(document, window.jQuery));
