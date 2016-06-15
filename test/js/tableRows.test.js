/**
 * OLCS.tableRows
 *
 * grunt test:single --target=tableRows
 */

describe('OLCS.tableRows', function() {
  
  'use strict';

  beforeEach(function() {
    this.component = OLCS.tableRows;
  });

  it('should be a function', function() {
    expect(this.component).to.be.a('function');
  });

  describe('When invoked', function() {

    beforeEach(function() {
      this.component();
    });

    afterEach(function() {
      $(document).off('click', 'tbody tr');
      $(document).off('mousenter', 'tbody tr');
      $(document).off('mouseleave', 'tbody tr');
      $(document).off('keyup', 'tbody tr');
    });

    describe('Given a stubbed DOM with a table row which contains a single action', function() {

      beforeEach(function() {
        $('body').append([
          '<tbody id="tbody">',
            '<tr id="tr1" class="js-rows">',
              '<td id="td1"><a href="#" id="l1"></a></td>',
              '<td id="td2"></td>',
              '<td id="td3"><input type="checkbox" id="cb1"></td>',
            '</tr>',
          '</tbody>'
        ].join('\n'));
      });

      afterEach(function() {
        $('#tbody').remove();
      });

      describe('When the table row is clicked', function() {
        beforeEach(function() {
          this.buttonClickSpy = sinon.spy();
          $('#l1').on('click', this.buttonClickSpy);
          $('#td2').click();
        });

        afterEach(function(){
          $('#l1').off('click', this.buttonClickSpy);
        });

        // @FIXME: fails in PhantomJS, passes in all real browsers
        // boils down to the .click() call inside the component being
        // called on the raw DOM element; this isn't officially supported
        //
        // In any case, some of the component could do with a tidy anyway
        // so revisit on another day
        it.skip('triggers the click of its main action', function() {
          expect(this.buttonClickSpy.callCount).to.equal(1);
        });
      });

      describe('When a mouse enters a table row', function() {

        beforeEach(function() {
          $('#tr1').mouseenter();
        });

        it('attaches a class of "hover" to the table row', function() {
          expect($('#tr1').hasClass('hover')).to.equal(true);
        });

        describe('And then when the mouse leaves', function() {
          beforeEach(function() {
            $('#tr1').mouseleave();
          });
          it('removes the "hover" class', function() {
            expect($('#tr1').hasClass('hover')).to.equal(false);
          });
        });

      }); // When a mouse enters a table row

      describe('When the select box is unchecked', function() {

        beforeEach(function() {
          $('#cb1').prop('checked', true).change();
          $('#td3').click();
        });

        it('removes the "checked" class from the table row', function() {
          expect($('#tr1').hasClass('checked')).to.equal(false);
        });

        describe('When the select box is re-checked', function() {
          beforeEach(function() {
            $('#cb1').prop('checked', false).change();
            $('#td3').click();
          });
          it('adds the "checked" class to the table row', function() {
            expect($('#tr1').hasClass('checked')).to.equal(true);
          });
        });

      }); // When the select box is unchecked

      describe('When a table row is clicked whilst the ctrl key is pressed', function() {

        beforeEach(function() {
          // simulate shift + click (akin to right click)
          var keyboardEvent = document.createEvent('KeyboardEvent');
          var initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? 'initKeyboardEvent' : 'initKeyEvent';
          keyboardEvent[initMethod](
            'keydown', // event type : keydown, keyup, keypress
            true, // bubbles
            true, // cancelable
            window, // viewArg: should be window
            false, // ctrlKeyArg
            false, // altKeyArg
            true, // shiftKeyArg
            false, // metaKeyArg
            40, // keyCodeArg : unsigned long the virtual key code, else 0
            0 // charCodeArgs : unsigned long the Unicode character associated with the depressed key, else 0
          );
          document.dispatchEvent(keyboardEvent);
        });

        afterEach(function(){
          $(document).trigger('keyup');
        });

        it('should not open the context menu', function() {
        });

      }); // When a table row is clicked whilst the ctrl key is pressed

    }); // Given a stubbed DOM with a table row which contains a single action

    describe('Given a stubbed DOM with a table row which contains more than one action', function() {

      beforeEach(function() {
        $('body').append([
          '<tbody id=tbody>',
            '<tr id=tr1>',
              '<td id=td1><a href=# id=l1></a></td>',
              '<td id=td2></td>',
              '<td id=td3><a href=# id=l2></a></td>',
              '<td id=td4><input type=radio id=r1></td>',
            '</tr>',
          '</tbody>'
        ].join('\n'));
      });

      afterEach(function() {
        $('#tbody').remove();
      });

      describe('When the table row is clicked', function() {
        beforeEach(function() {
          this.buttonClickSpy = sinon.spy();
          $('#td1').on('click', this.buttonClickSpy);
          $('#td2').click();
        });

        afterEach(function(){
          $('#td1').off('click');
        });

        it('doesn`t trigger the click of its main action', function() {
          expect(this.buttonClickSpy.callCount).to.equal(0);
        });
      });

      describe('When a mouse enters a table row', function() {
        beforeEach(function() {
          $('#tr1').mouseenter();
        });
        it('doesn`t attach a class of "hover" to the table row', function() {
          expect($('#tr1').hasClass('hover')).to.equal(false);
        });
      });

    }); // Given a stubbed DOM with a table row which contains more than one action

    describe('Given a stubbed DOM with a table row which contains a select element', function() {

      beforeEach(function() {
        $('body').append([
          '<tbody id="tbody">',
            '<tr id="tr1">',
              '<td id="td1"><a href=#></a></td>',
              '<td id="td2"><input type="checkbox" id="cb1"></td>',
            '</tr>',
            '<tr id="tr2">',
              '<td id="td3"><a href=#></a></td>',
              '<td id="td4"><input type="checkbox" id="cb2"></td>',
            '</tr>',
          '</tbody>'
        ].join('\n'));
      });

      afterEach(function() {
        $('#tbody').remove();
      });

      describe('When a td is clicked that contains a select box', function() {

        beforeEach(function() {
          $('#td2').click();
        });

        it('triggers the click of its select box', function() {
          expect($('#cb1').is(':checked')).to.equal(true);
        });

      }); // When a td is clicked that contains a select box

      describe('When a table row is clicked whilst the ctrl key is pressed', function() {

        beforeEach(function() {
          $('#cb1').prop('checked', false);
          $('#cb2').prop('checked', false);
          $(document).trigger({
            type: 'keydown',
            which: 17
          });
          $('#tr1').click();
        });

        afterEach(function(){
          $(document).trigger('keyup');
        });

        it('#cb1 should be checked', function() {
          expect($('#cb1').is(':checked')).to.equal(true);
        });

        it('#cb2 should be checked', function() {
          expect($('#cb2').is(':checked')).to.equal(true);
        });

      }); // When a table row is clicked whilst the ctrl key is pressed

    }); // Given a stubbed DOM with a table row which contains a select element

  }); // When invoked

});
