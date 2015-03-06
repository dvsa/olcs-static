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

  var fileUploader     = '.file-uploader';
  var fileActions      = '.file-uploader__actions';
  var fileAction       = '.file-uploader__action';
  var fileInput        = 'input[type=file]';
  var fileRemoveAction = '.file-uploader__remove';
  var fileListItem     = '.file-uploader__item';
  var fileList         = '.file-uploader__list';
  var submit           = 'input[type=submit]';

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
      var thisListItem     = $(element).closest(fileListItem);
      var thisIndex        = thisListItem.index();
      var lastAction       = thisFileUploader.find(fileAction).last();
      var thisSubmit       = thisFileUploader.find(submit);

      // If we're dealing with a multiple file uploader,
      // remove the corresponding file input
      if (isMultiple) {
        thisFileUploader.find(fileAction).eq(thisIndex).remove();
      }

      // If this is the last item in the list, change the
      // button's text and hide the submit button
      if (thisIndex === 0) {
        lastAction.html(replaceString(lastAction,'Attach another file','Attach file'));
        $(thisSubmit).addClass('js-hidden');
      }

      // Remove the list item
      thisListItem.remove();
    }

    function getFileList(element) {
      var domFileList = [];
      var fileName;

      // Loop through all the attached files
      element.each( function() {

        // If this browser is IE8 or 9
        if (this.files === undefined && this.value) {
          fileName = getFileName(this.value);

          // Pass the file name into a html template and then push that
          // to the array
          domFileList.push(
            '<div class="file-uploader__item">'+
            ' <p>'+fileName+'</p>'+
            ' <a class="file-uploader__remove" href="#">Cancel</a>'+
            '</div>'
          );
        } else if (this.files !== undefined && this.files.length) {
          var formattedSize = formatFileSizeString(this.files[0].size);
          fileName          = this.files[0].name;

          // Pass the file name and the file size into a html template
          // and then push that to the array
          domFileList.push(
            '<div class="file-uploader__item">'+
            ' <p>'+fileName +' <span>'+formattedSize+'</span></p>'+
            ' <a class="file-uploader__remove" href="#">Cancel</a>'+
            '</div>'
          );
        }
      });

      return domFileList;
    }


    // When the file input is updated
    $(selector).on('change', fileInput, function() {
      var thisFileUploader     = $(this).parents(fileUploader);
      var thisFileAction       = thisFileUploader.find(fileAction);
      var thisFileList         = thisFileUploader.find(fileList);
      var thisFileInputs       = thisFileUploader.find(fileInput);
      var thisSubmit           = thisFileUploader.find(submit);
      var newFileAction        = cloneElement($(thisFileAction).last());

      // If this file uploader can handle mutliple files switch out
      // the current file upload action for a new empty one
      if (isMultiple) {
        $(this).closest(fileActions).append(newFileAction);
        $(this).closest(fileAction).hide();
      }

      // If there is one attached file show the submit button
      if (thisFileInputs.length === 1) {
        $(thisSubmit).removeClass('js-hidden');
      }

      // Redraw the file list
      thisFileList.html(getFileList(thisFileInputs));
    });


    // When a remove link is clicked remove the list item and file input
    $(selector).on('click', fileRemoveAction, function(e) {
      e.preventDefault();
      removeFile(this);
    });

  };

}(document, window.jQuery));
