var OLCS = OLCS || {};

/**
 * OLCS.fileUploader
 *
 * Enhances the file uploader 
 *
 */

OLCS.fileUploader = (function(document, $, undefined) {

  'use strict';

  var fileUploader     = '.file-uploader';
  var fileInput        = 'input[type=file]';
  var fileUploadButton = '.action--primary, .action--secondary';
  var fileList         = '.file-uploader__list';
  var fileActions      = '.file-uploader__actions'
  var fileAction       = '.file-uploader__action';
  var fileRemoveAction = '.file-uploader__remove';
  
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


    function createNewFileInput(element) {

      // Get the number of uploader actions
      var actionCount = element.length + 1;

      // Clone the last file input
      var newfileUploaderAction = element.last().clone();

      // Store a string version
      var newHTML = newfileUploaderAction.html();
      
      // Find the ID
      var regex = new RegExp(/fileUpload\[(.*?)\]/g);

      // Replace ID with the new incremented one 
      newHTML = newHTML.replace(regex, "fileUpload["+actionCount+"]");

      // Set the HTML of our new element
      newfileUploaderAction.html(newHTML);

      // Return the new element
      return newfileUploaderAction;

    }


    // When the file upload button is clicked trigger a 
    // click of the file input
    $(document).on('click', fileUploadButton, function(e) {
      e.preventDefault();
      $(this).siblings(fileInput).click();
    });


    // When the file input is updated
    $(document).on('change', fileInput, function() {
      
      var newFiles       = this.files;
      var allFiles       = [];
      var domFileList    = [];
      var thisParent     = $(this).parents(fileUploader);
      var thisFileAction = thisParent.find(fileAction);

      console.log($(fileAction).length);

      if (newFiles.length) {
        
        // Add the new file uploader
        $(this).closest(fileActions).append(createNewFileInput(thisFileAction));

        // Hide the current file uploader
        $(this).closest(fileAction).hide();
        
        // Get every file from every file inputs within the parent .file-uploader
        // and push it to our array
        thisParent.find(fileInput).each( function() {
          
          for (var i = 0; i < this.files.length; i++) {
            var fileName      = this.files[i].name;
            var fileSize      = this.files[i].size;
            var formattedSize = formatFileSizeString(fileSize);

            // Populate the domFileList array with dom elements
            domFileList.push('<div class="file-uploader__item"><p>'+ 
              fileName +
              ' <span>'+ 
              formattedSize +
              '</span></p><a class="file-uploader__remove" href="#">Cancel</a></div>'
            );
          }
         
        });

        // Redraw the file list
        $(fileList).html(domFileList);

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
          '</p><a class="file-uploader__remove" href="#">Cancel</a></div>'
        );
      }
    });

  };

}(document, window.jQuery));
