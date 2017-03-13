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

  it('should be defined', function() {
    expect(this.component).to.exist;
  });

  it('should expose the TinyMCE method', function() {
    expect(typeof(tinymce)).to.not.be('undefined');
  });

  describe('when initialised with default options', function() {

    beforeEach(function() {
      $('body').append([
        '<textarea id="stub" class="tinymce"></textarea>'
      ].join('\n'));
      this.component();
      OLCS.eventEmitter.emit('render');
    });

    it('should successfullly create a TinyMCE instance', function() {
      expect($('.mce-tinymce').length).to.equal(1);
      expect($('.mce-tinymce iframe').length).to.equal(1);
      expect(tinymce.EditorManager.editors.length).to.equal(1);
    });

    afterEach(function() {
      $('#stub').remove();
    });

  });

  describe('when initialised with ajaxified content within a modal', function() {

    beforeEach(function() {
      $('body').append('<a id="stub" class="js-modal-ajax" href="test.html">Click me</a>');

      this.component();
      
      $('#stub').click();

      OLCS.eventEmitter.emit('render');
    });

    it('should make an ajax request', function() {
      expect(sinon.stub(OLCS, 'ajax').calledOnce).to.equal(true);
    });

    afterEach(function() {
      $('#stub').remove();
    });

  });

});