var OLCS = OLCS || {};

/**
 * File upload
 */

OLCS.fileUpload = (function(document, $, undefined) {

  "use strict";

  return function init(options) {

    var F = OLCS.formHelper;
    var asyncUploads       = true;
    var containerSelector  = ".file-uploader";
    var inputSelector      = ".attach-action__input";
    var removeSelector     = ".file__remove";
    var mainBodySelector   = ".js-body";
    var submitSelector     = ".js-upload";
    var numUploaded        = 0;
    var totalUploads       = 0;
    var MULTI_UPLOAD_DELAY = 1000;
    var enabledElements;

    function disableElements(form, container) {
      var formActions  = form.find(".actions-container").last().children().not(":disabled");
      var attachButton = container.find(".attach-action__input");
      enabledElements  = formActions.add(attachButton);
      attachButton.parent("label").addClass("disabled");
      enabledElements.attr({
        "disabled"    : true,
        "aria-hidden" : true
      });
    }

    function enableElements() {
      enabledElements
        .removeAttr("disabled", "aria-hidden")
        .removeClass("disabled");
    }

    function handleResponse(response, index) {
      var originalUploader = ".file-uploader:eq("+index+")";
      var updatedUploader  = $(response).find(originalUploader);
      F.render(originalUploader, updatedUploader[0].innerHTML);
    }

    var deleteResponse = OLCS.normaliseResponse(function(response) {
      if (OLCS.modal.isVisible()) {
        OLCS.modal.updateBody(response.body);
      } else {
        F.render(mainBodySelector, response.body);
      }
    });

    if (window.FormData === undefined) {
      OLCS.logger.warn("XHR form uploads not supported in this browser", "fileUpload");
      asyncUploads = false;
    }

    function upload(form, container, index, file) {
      var fd             = new FormData();
      var name           = $(container).data("group");
      var kbSize         = Math.round(file.size / 1024);
      var xhr            = new XMLHttpRequest();
      var containerIndex = $(container).index(containerSelector);

      OLCS.logger.debug(
        "Uploading file " + file.name + " (" + file.type + ")",
        "fileUpload"
      );

      disableElements(form, container);

      $(container).find(".js-upload-list").append([
        "<li class=file data-upload-index=" + index + ">",
          "<span class=file__preloader></span>",
          "<a href=#>",
            file.name,
          "</a>",
          "<span>",
            kbSize + "KB",
          "</span>",
          "<span class=file__remove>Uploading &hellip;</span>",
        "</li>"
      ].join("\n"));

      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          numUploaded ++;
          OLCS.logger.debug(
            "File " + numUploaded + "/" + totalUploads + " complete",
            "fileUpload"
          );

          $("[data-upload-index=" + index + "]")
          .find(".file__preloader")
          .remove()
          .find(".file__remove")
          .replaceWith("<a href=# class=file__remove>Remove</a>");

          if (numUploaded === totalUploads) {
            OLCS.logger.debug(
              "All files uploaded",
              "fileUpload"
            );
            handleResponse(xhr.responseText, containerIndex);
          }

          enableElements();

        }
      };

      fd.append(name + "[file]", file);
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
      }, index * MULTI_UPLOAD_DELAY);
    }

    function setup() {
      $(submitSelector).hide();
      $(inputSelector).attr("multiple", options.multiple);
    }

    $(document).on("click", removeSelector, function(e) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      var button = $(this);
      var form   = $(this).parents("form");

      F.pressButton(form, button);

      OLCS.submitForm({
        form: form,
        success: deleteResponse
      });
    });

    if (asyncUploads) {
      $(document).on("change", inputSelector, function(e) {
        e.preventDefault();
        e.stopPropagation();

        var form       = $(this).parents("form");
        var container  = $(this).parents(containerSelector);
        var files      = e.target.files;
        numUploaded    = 0;
        totalUploads   = files.length;

        OLCS.logger.debug("Uploading " + files.length + " file(s)", "fileUpload");

        $.each(files, function(index, file) {
          upload(form, container, index, file);
        });
      });

      OLCS.eventEmitter.on("render", setup);
    }
  };

}(document, window.jQuery));
