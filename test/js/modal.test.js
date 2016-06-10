/*/**
 * OLCS.modal
 *
 * grunt test:single --target=modal
 */

describe('OLCS.modal', function() {

  'use strict';

  beforeEach(function() {
    this.component = OLCS.modal;
  });

  it('should be defined', function() {
    expect(this.component).to.exist;
  });

  it('should expose the correct public interface', function() {
    expect(this.component.show).to.be.a('function');
    expect(this.component.hide).to.be.a('function');
    expect(this.component.isVisible).to.be.a('function');
    expect(this.component.updateBody).to.be.a('function');
  });

  describe('show', function() {

    beforeEach(function() {
      this.component.show('body here', 'title here');
    });

    afterEach(function() {
      this.component.hide();
    });

    it('shows the modal overlay', function() {
      expect($('.overlay').is(':visible')).to.be(true);
    });

    it('shows the modal wrapper', function() {
      expect($('.modal__wrapper').is(':visible')).to.be(true);
    });

    it('applies the correct title', function() {
      expect($('.modal__title').text()).to.equal('title here');
    });

    it('applies the correct body', function() {
      expect($('.modal__content').text()).to.equal('body here');
    });

  }); // show

  describe('hide', function() {

    beforeEach(function() {
      this.eventSpy = sinon.spy(OLCS.eventEmitter, 'emit');
      this.component.hide();
    });

    afterEach(function() {
      this.eventSpy.restore();
    });

    it('hides the modal overlay', function() {
      expect($('.overlay').is(':visible')).to.be(false);
    });

    it('hides the modal wrapper', function() {
      expect($('.modal__wrapper').is(':visible')).to.be(false);
    });

    it('emits the correct event', function() {
      expect(this.eventSpy.firstCall.args[0]).to.equal('hide:modal');
    });

  }); // hide

  describe('Given a stubbed DOM with a modal close button', function() {

    beforeEach(function() {
      $('body').append([
        '<div class=modal__wrapper>',
          '<a href=# class=modal__close>Close</a>',
        '</div>'
      ].join('\n'));
    });

    afterEach(function() {
      $('.modal__wrapper').remove();
    });

    it('should have a close button', function() {
      expect($('.modal__close').length).to.be(1);
    });

    it('should have a modal wrapper', function() {
      expect($('.modal__wrapper').length).to.be(1);
    });

    describe('When clicking the modal close button', function() {

      beforeEach(function() {
        this.spy = sinon.stub(this.component, 'hide');
        $('.modal__close').trigger('click');
      });

      afterEach(function() {
        this.spy.restore();
      });

      it('invokes the modal’s hide method', function() {
        expect(this.spy.called).to.be(true);
      });

    });

    describe('when pressing the Esc button', function() {

      beforeEach(function() {
        $(document).trigger({
          type: 'keyup',
          which: 27
        }); 
      });

      it('hides the modal', function() {
        expect($('.modal__wrapper').is(':visible')).to.be(false);
      });

    });

  }); // Given a stubbed DOM with a modal close button

  describe('Simulate mobile experience', function() {
    
    beforeEach(function() {
      $('body').append([
        '<div class=modal__wrapper>',
          '<input type="text" />',
        '</div>'
      ].join('\n'));
    });

    describe('When an input element is focused', function() {
      beforeEach(function() {
        $('input').focus();
      });
      it('centers the modal wrapper', function() {
        expect($('.modal__wrapper').css('position')).to.equal('absolute');
      });
    });

    describe('When an input element is blurred', function() {
      beforeEach(function() {
        $('input').blur();
      });
      it('centers the modal wrapper', function() {
        expect($('.modal__wrapper').css('position')).to.equal('static');
      });
    });

  }); // Simulate mobile experience

  describe('When invoked', function() {
    
    beforeEach(function() {
      $('body').append([
        '<div class=modal__wrapper>',
          '<input type="text" />',
        '</div>'
      ].join('\n'));
    });

  }); // Simulate mobile experience

});
