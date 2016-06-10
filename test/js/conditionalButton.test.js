/**
 * OLCS.conditionalButton
 *
 * grunt test:single --target=conditionalButton
 */

describe('OLCS.conditionalButton', function() {

  'use strict';

  beforeEach(function() {
    this.component = OLCS.conditionalButton;
  });

  it('should be defined', function() {
    expect(this.component).to.exist;
  });

  it('should be a function', function() {
    expect(this.component).to.be.a('function');
  });

  describe('Given a stubbed DOM', function() {

    beforeEach(function() {
      var template = [
        '<form id="stub" method="post" action="/baz">',
          '<div class=actions-container>',
            '<button type=submit value=Edit>Edit</button>',
            '<button type=submit value=Delete>Delete</button>',
          '</div>',
        '</form>'
      ].join('\n');
      this.body = $('body');
      this.body.append(template);
      this.on = sinon.spy($.fn, 'on');
    });

    afterEach(function() {
      this.on.restore();
      $('#stub').remove();
    });

    describe('when initialised with valid options', function() {

      beforeEach(function() {
        this.component({
          form : '#stub'
        });
      });

      afterEach(function() {
        $(document).off('change');
      });

      it('binds a change handler to the correct selectors', function() {
        expect(this.on.firstCall.args[0]).to.equal('change');
        expect(this.on.firstCall.args[1]).to.equal('#stub');
      });

    }); // when initialised with valid options

    describe('when initialised with both label and selector options', function() {

      beforeEach(function() {
        try {
          this.component({
            label : '#foo',
            selector : '#foo'
          });
        } catch(e) {
          this.error = e;
        }
      });

      it('throws the correct error', function() {
        expect(this.error.message).to.equal('\'label\' and \'selector\' are mutually exclusive');
      });

    }); // when initialised with both label and selector options

    describe('when initialised with a label option', function() {

      beforeEach(function() {
        this.component({
          label : '#foo'
        });
      });

      it('', function() {
      });

    }); // when initialised with a label option

  }); // Given a stubbed DOM

});
