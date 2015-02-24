var OLCS = OLCS || {};

/**
 * OLCS.fileUploader
 *
 * Enhances the file uploader 
 *
 */

OLCS.fileUploader = (function(document, $, undefined) {

  'use strict';

  var fileUploadSelector = '.file-uploader';
  var fileUploadButton   = ''+ fileUploadSelector +' .action--secondary';
  var fileInput          = ''+ fileUploadSelector +' input[type=file]';

  
  return function init() {

    function getFileName(path) {
      var index = path.lastIndexOf("\\") + 1;
      return path.substr(index);
    }

    function formatFileSizeString(fileSizeInBytes) {
      var string = fileSizeInBytes.toString();
      var stringLength = string.length;

      var kilo = fileSizeInBytes / 1000;
      var mega = kilo / 1000;
      var giga = mega / 1000;

      if (stringLength <= 3) {
        return '0 kB';
      }
      else if (stringLength <= 6) {
        return kilo.toFixed(0) + ' kB';
      }
      else if (stringLength <= 9) {
        return mega.toFixed(1) + ' MB'; 
      } 
      else {
        return giga.toFixed(1) + ' GB'; 
      }
    }

    function fileInputFactory(int) {
      var fileSetID = 'fileset'+int+'';
      var hiddenFileInput = '<input class="js-hidden" type="file" data-attr="'+fileSetID+'">';

      $(fileUploadSelector).append(hiddenFileInput)

    }

    var existingFiles;

    // When the file upload button is clicked
    // trigger a click of the file input
    $(document).on('click', fileUploadButton, function(e) {
      e.preventDefault();
      
      // Cache any existing files 
      existingFiles = $(this).siblings('input')[0].files;

      // Trigger a click of the hidden input 
      $(fileInput).click();
    });



    // When the file input is updated
    $(document).on('change', fileInput, function() {
      
      else {
        console.log("File uploader is empty");
      }

      var fileList      = this.files;
      var domFileList   = [];

      console.log(fileList); 
      

      if (fileList.length) {

        // Loop through the file list
        for (var i = 0; i < fileList.length; i++) {
          var fileName      = fileList[i].name;
          var fileSize      = fileList[i].size;
          var formattedSize = formatFileSizeString(fileSize);

          // Populate the domFileList array with dom elements
          domFileList.push('<div class="file-uploader__item"><p>'+ 
            fileName +
            ' <span>'+ 
            formattedSize +
            '</span></p><a class="file-uploader__remove" href="#">Remove</a></div>'
          );
        }

        // Redraw the file list
        $('.file-uploader__list').html(domFileList);

      }

    });

    // For IE users we bind a property change event
    $(fileInput).on('propertychange', function(e) {
      
      // If it's not empty
      if (this.value) {
        var fileName = getFileName(this.value);

        // Create a corresponding element and append it to the dom
        $('.file-uploader__list').html('<div class="file-uploader__item"><p>'+ 
          fileName +
          '</p><a class="file-uploader__remove" href="#">Remove</a></div>'
        );
      }
    });

  };

}(document, window.jQuery));
