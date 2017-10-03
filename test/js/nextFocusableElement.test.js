/**
 * OLCS.nextFocusableElement
 *
 * grunt test:single --target=nextFocusableElement
 */

describe("OLCS.nextFocusableElement", function() {
  "use strict";

  beforeEach(function() {
    this.component = OLCS.nextFocusableElement;
  });

  it("should be defined", function() {
    expect(this.component).to.exist;
  });

  describe('Given a stubbed DOM', function() {
      beforeEach(function() {
          $('body').append([
              '<tbody id="tbody">',
              '<tr id="tr1">',
              '<td><a href=#></a></td>',
              '<td><input type="checkbox" id="cb1" name="cb1"></td>',
              '</tr>',
              '<tr id="tr2">',
              '<td><a href=#></a></td>',
              '<td><input type="checkbox" name="cb2"></td>',
              '</tr>',
              '</tbody>'
          ].join('\n'));
      });

      afterEach(function() {
          $('#tbody').remove();
      });

      describe('When a an element is passed', function() {
          beforeEach(function() {
              this.result = this.component($('#tr1 a'));
          });

          it("returns the next focusable element", function() {
              expect(this.result).to.be.an("object");
              expect(this.result.attr('id')).to.be('cb1');
          });
      });

  });


});
