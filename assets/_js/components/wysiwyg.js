var OLCS = OLCS || {};

/**
 * WYSIWYG
 *
 * Small wrapper around TinyMCE plugin to tidy up some of the
 * formatting/code it spews out
 */

OLCS.wysiwyg = (function(document, $, undefined) {

  'use strict';

  return function init() {

    OLCS.eventEmitter.on('render', function() {

      if (typeof(tinymce) === 'undefined') {
        return;
      }

      $('.tinymce').each(function() {
        $(this).tinymce({
          menubar : false,
          statusbar : false,
          document_base_url: '../tinymce/',
          spellchecker_languages : '+English=en',
          spellchecker_language : 'en',
          spellchecker_rpc_url: 'index.php',
          spellchecker_report_misspellings : true,
          forced_root_blocks: false,
          height : 260,
          content_css : '../tinymce/skins/lightgray/custom.css',
          style_formats: [
            {title: 'Header 1', format: 'h1'},
            {title: 'Header 2', format: 'h2'},
            {title: 'Header 3', format: 'h3'}
          ],
          plugins: [
            'lists charmap',
            'searchreplace',
            'paste spellchecker'
          ],
          toolbar: 'styleselect | bold italic underline | bullist numlist | indent outdent | spellchecker'
        });

        // If the editor was initialised in a modal, we need to remove it
        // when the modal closes
        OLCS.eventEmitter.on('hide:modal', function() {
          tinymce.EditorManager.editors = []; // jshint ignore:line
        });
      });

    });

  };

}(document, window.jQuery));
