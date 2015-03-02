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
  var fileActions      = '.file-uploader__actions';
  var fileAction       = '.file-uploader__action';
  var fileUploadButton = '.action--primary, .action--secondary';
  var fileInput        = 'input[type=file]';
  var fileRemoveAction = '.file-uploader__remove';
  var fileListItem     = '.file-uploader__item';
  var fileList         = '.file-uploader__list';

  return function init() {

    function getFileName(path) {
      var index = path.lastIndexOf('\\') + 1;
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

    function createNewFileAction(current) {

      var newfileAction = $(current).last().clone();

      var regex         = new RegExp(/fileUpload\[(.*?)\]/g);
      var actionsCount  = $(current).find(fileAction).length + 1;
      var newHTML       = newfileAction.html();

      // Replace ID with the new incremented one
      newHTML = newHTML.replace(regex, 'fileUpload['+actionsCount+']');

      // Set the HTML of our new element
      newfileAction.html(newHTML);

      // Return the new element
      return newfileAction;

    }

    function removeFile(current) {

      var thisFileUploader = $(current).parents(fileUploader);
      var thisListItem     = $(current).closest(fileListItem);
      var thisIndex        = thisListItem.index();

      // Remove the corresponding file input
      thisFileUploader.find(fileAction).get(thisIndex).remove();

      // Remove it's parent list item
      thisListItem.remove();
    }


    // When the file upload button is clicked trigger a
    // click of the file input
    $(document).on('click', fileUploadButton, function(e) {
      e.preventDefault();
      $(this).siblings(fileInput).click();
    });

    // When the file input is updated
    $(document).on('change', fileInput, function() {

      var thisFileUploader = $(this).parents(fileUploader);
      var thisFileAction   = thisFileUploader.find(fileAction);
      var thisFileList     = thisFileUploader.find(fileList);
      var domFileList      = [];

      // Add the new file uploader
      $(this).closest(fileActions).append(createNewFileAction(thisFileAction));

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

      thisFileList.html(domFileList);

    });

    //For IE users we bind a property change event
    $(fileInput).on('propertychange', function() {

      var thisFileUploader = $(this).parents(fileUploader);
      var thisFileAction   = thisFileUploader.find(fileAction);
      var thisFileList     = thisFileUploader.find(fileList);
      var domFileList      = [];

      // Add the new file uploader
      $(this).closest(fileActions).append(createNewFileAction(thisFileAction));

      // Hide the current file uploader
      $(this).closest(fileAction).hide();

      thisFileUploader.find(fileInput).each( function() {
        if (this.value) {
          var fileName = getFileName(this.value);

          // Create a corresponding element and append it to the dom
          thisFileList.html('<div class="file-uploader__item"><p>'+
            fileName +
            '</p><a class="file-uploader__remove" href="#">Cancel</a></div>'
          );
        }
      });

      thisFileList.html(domFileList);
    });

    // When a remove link is clicked remove the list item and file input
    $(document).on('click', fileRemoveAction, function(e) {
      e.preventDefault();
      removeFile(this);
    });

  };

}(document, window.jQuery));
