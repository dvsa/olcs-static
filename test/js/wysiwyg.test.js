/**
 * OLCS.url
 *
 * grunt test:single --target=wysiwyg
 */
describe('OLCS.wysiwyg', function() {

  'use strict';

  beforeEach(function() {
    this.component = OLCS.wysiwyg;
  });

  beforeEach(function() {
    $('body').append([
      '<textarea id="stub" class="tinymce"></textarea>'
    ].join('\n'));
  });

  it('should be defined', function() {
    expect(this.component).to.exist;
  });

  it('should successfullly create a TinyMCE instance', function() {
    expect(typeof(tinymce)).to.not.be('undefined');
  });

  describe('when initialised with default options', function() {

    beforeEach(function() {
      this.component();
    });

    it('should successfullly create a TinyMCE instance', function() {
      expect(tinymce.EditorManager.editors).to.eql([]);
    });

  });

});