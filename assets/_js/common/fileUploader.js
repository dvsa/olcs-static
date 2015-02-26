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

    function createNewFileAction(element,count) {

      // Clone the last file input
      var newfileAction = element.last().clone();

      // Store a string version
      var newHTML = newfileAction.html();
      
      // Find the ID
      var regex = new RegExp(/fileUpload\[(.*?)\]/g);

      // Replace ID with the new incremented one 
      newHTML = newHTML.replace(regex, "fileUpload["+count+"]");

      // Set the HTML of our new element
      newfileAction.html(newHTML);

      // Return the new element
      return newfileAction;

    }


    // When the file upload button is clicked trigger a 
    // click of the file input
    $(document).on('click', fileUploadButton, function(e) {
      e.preventDefault();
      $(this).siblings(fileInput).click();
    });

    // When the file input is updated
    $(document).on('change', fileInput, function() {    
      ;
      var thisFileUploader = $(this).parents(fileUploader);
      var thisFileAction   = thisFileUploader.find(fileAction);
      var thisFileList     = thisFileUploader.find(fileList);
      var domFileList      = [];
      var noOfFileActions  = thisFileAction.length + 1;

      // Add the new file uploader
      $(this).closest(fileActions).append(createNewFileAction(thisFileAction,noOfFileActions));

      // Hide the current file uploader
      $(this).closest(fileAction).hide();
      
      // Get every attached file 
      thisFileUploader.find(fileInput).each( function() {

        if (this.files.length) {
          var fileName      = this.files[0].name;
          var formattedSize = formatFileSizeString(this.files[0].size);

          // Push a template to the domFileList array
          domFileList.push('<div class="file-uploader__item"><p>'+ 
            fileName +
            ' <span>'+ 
            formattedSize +
            '</span></p><a class="file-uploader__remove" href="#">Cancel</a></div>'
          );
       }

      });

      // Redraw the file list
      thisFileList.html(domFileList);

    });


    $(document).on('click', fileRemoveAction, function(e) {
      e.preventDefault();

      var index = $(this).closest('.file-uploader__item').index();
      var thisFileUploader = $(this).parents(fileUploader);

      thisFileUploader.find('.file-uploader__action').get(index).remove();
      $(this).parent('.file-uploader__item').remove();

      

      thisFileUploader.find('input:file').each( function() {

        if (this.files.length) {
          var fileName      = this.files[0].name;
          var formattedSize = formatFileSizeString(this.files[0].size);

          console.log(fileName);

        }
      });

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
