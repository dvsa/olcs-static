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

      var tinymce = tinymce || 'undefined';

      // if there are no tinymce's on the page, stop here
      if (tinymce === 'undefined') {
        return;
      }

      // handle previously created tinymce's
      tinymce.EditorManager.editors.forEach(function(editor) {
          var old_global_settings = tinymce.settings;
          tinymce.settings = editor.settings;
          tinymce.EditorManager.execCommand('mceRemoveEditor', false, editor.id);
          tinymce.EditorManager.execCommand('mceAddEditor', false, editor.id);
          tinymce.settings = old_global_settings;
      });

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

      });

    });

  };

}(document, window.jQuery));
