/**
 * OLCS.url
 *
 * grunt test:single --target=wysiwyg
 */
describe('OLCS.wysiwyg', function() {

  'use strict';

  it('should be defined', function() {
    expect(OLCS.wysiwyg).to.exist;
  });

  it('should expose the TinyMCE API', function() {
    expect(typeof(tinymce)).to.not.be('undefined');
  });

  describe('when initialised with default options', function() {
    beforeEach(function() {
      $('body').append('<textarea id="stub" class="tinymce"></textarea>');
      OLCS.wysiwyg();
      OLCS.eventEmitter.emit('render');
    });

    afterEach(function() {
      $('#stub').remove();
      tinyMCE.remove();
    });

    it('should successfullly create a TinyMCE instance', function() {
      expect($('.mce-tinymce').length).to.equal(1);
      expect($('.mce-tinymce iframe').length).to.equal(1);
      expect(tinymce.EditorManager.editors.length).to.equal(1);
    });
  });

  describe('when initialised via AJAX inside a modal', function() {
    beforeEach(function() {
      this.ajax = sinon.stub(OLCS, 'ajax');
      $('body').append('<a id="stub" class="js-modal-ajax" href="test.html">Click me</a>');
    });

    afterEach(function() {
      this.ajax.restore();
      $('#stub').remove();
    });
    
    describe('when clicking the target action', function() {
      beforeEach(function() {
        OLCS.modalLink({trigger: '.js-modal-ajax'});
        $('#stub').click();
      });

      it('invokes an AJAX request', function() {
        expect(this.ajax.callCount).to.equal(1);
      });

      it('with the correct URL', function() {
        expect(this.ajax.firstCall.args[0].url).to.equal('test.html');
      });

      describe("Given the request returns successfully", function() {
        beforeEach(function() {
          this.ajax.yieldTo('success', '<div class="response">I am a response</div>');
        });

        it.skip('inserts the response into the modal', function() {
          console.log($('.response').length);
          expect($('.response').length).to.equal(1);
        });
      });
    });
  });

});