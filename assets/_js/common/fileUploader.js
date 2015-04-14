var OLCS = OLCS || {};

/**
 * OLCS.fileUploader
 *
 * File uploader enables the user to attach multiple files
 * and provides and nicer, more conistent UI element.
 *
 */

OLCS.fileUploader = (function(document, $, undefined) {

  'use strict';

  var fileUploader       = '.file-uploader';
  var attachAction       = '.attach-action';
  var attachActionList   = '.attach-action__list';
  var fileInput          = 'input[type=file]';
  var file               = '.file';
  var fileRemove         = '.file__remove';
  var attachedFileList   = '.attached-file__list';
  var submit             = 'input[type=submit].inline-upload';

  return function init(options) {

    var selector     = options.selector || '.file-uploader';
    var isMultiple   = options.isMultiple !== undefined ? options.isMultiple : false;

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

      if (stringLength <= 6) {
        return kilo.toFixed(0) + ' kB';
      }

      if (stringLength <= 9) {
        return mega.toFixed(1) + ' MB';
      }

      return giga.toFixed(1) + ' GB';
    }

    function replaceString(element,from,to) {
      var newHTML = element.html();
      newHTML = newHTML.replace(new RegExp(''+from+''), ''+to+'');
      return newHTML;
    }

    function cloneElement(element) {
      var newElement = element.clone();
      newElement.html(replaceString(newElement,'Attach file','Attach another file'));
      return newElement;
    }

    function removeFile(element) {
      var thisFileUploader = $(element).parents(fileUploader);
      var thisFile         = $(element).closest(file);
      var thisIndex        = thisFile.index();
      var lastAction       = thisFileUploader.find(attachAction).last();
      var thisSubmit       = thisFileUploader.find(submit);

      // If we're dealing with a multiple file uploader,
      // remove the corresponding file input
      if (isMultiple) {
        thisFileUploader.find(attachAction).eq(thisIndex).remove();
      }

      // If this is the last item in the list, change the
      // button's text and hide the submit button
      if (thisIndex === 0) {
        lastAction.html(replaceString(lastAction,'Attach another file','Attach file'));
        $(thisSubmit).addClass('js-hidden');
      }

      // Remove any validation message
      thisFile.prev('.validation-message').remove();

      // Remove the list item
      thisFile.remove();
    }

    function getFileList(element) {
      var domFileList = [];
      var fileName;

      // Loop through all the attached files
      element.each(function() {

        // If this browser is IE8 or 9
        if (this.files === undefined && this.value) {
          fileName = getFileName(this.value);

          // Pass the file name into a html template and then push that
          // to the array
          domFileList.push(
            '<li class="file">'+
            ' <p>'+fileName+'</p>'+
            ' <a class="file__remove" href="#">Cancel</a>'+
            '</li>'
          );
        } else if (this.files !== undefined && this.files.length) {
          var formattedSize = formatFileSizeString(this.files[0].size);
          fileName          = this.files[0].name;

          // Pass the file name and the file size into a html template
          // and then push that to the array
          domFileList.push(
            '<li class="file">'+
            ' <p>'+fileName +' <span>'+formattedSize+'</span></p>'+
            ' <a class="file__remove" href="#">Cancel</a>'+
            '</li>'
          );
        }
      });

      return domFileList;
    }

    // When the file input is updated
    $(selector).on('change', fileInput, function() {
      var thisFileUploader     = $(this).parents(fileUploader);
      var thisAttachAction     = thisFileUploader.find(attachAction);
      var thisAttachedFileList = thisFileUploader.find(attachedFileList);
      var thisFileInputs       = thisFileUploader.find(fileInput);
      var thisSubmit           = thisFileUploader.find(submit);
      var newAttachAction      = cloneElement($(thisAttachAction).last());

      // If this file uploader can handle mutliple files switch out
      // the current file upload action for a new empty one
      if (isMultiple) {
        $(this).closest(attachActionList).append(newAttachAction);
        $(this).closest(attachAction).hide();
      }

      // If there is one or more attached files show the inline submit
      if (thisFileInputs.length >= 1) {
        $(thisSubmit).removeClass('js-hidden');
      }

      // Redraw the file list
      thisAttachedFileList.html(getFileList(thisFileInputs));
    });

    // When a remove link is clicked remove the list item and file input
    $(selector).on('click', fileRemove, function(e) {
      e.preventDefault();
      removeFile(this);
    });
  };

}(document, window.jQuery));
