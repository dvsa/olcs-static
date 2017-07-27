/**
 * OLCS.modalLink
 *
 * grunt test:single --target=showPreloader
 */

describe('OLCS.showPreloader', function() {

  'use strict';

  beforeEach(function() {
    this.component = OLCS.showPreloader;
  });


  it('should be an object', function() {
    expect(this.component).to.be.an('object');
  });

  describe('Given a stubbed DOM', function() {
    beforeEach(function() {
      this.template = [
        '<div id="stub">',
          '<button data-show-preloader="modal" id="showModal">click me</button>',
        '</div>'
      ].join('\n');

      this.body = $("body");
      this.body.append(this.template);
      this.component.initialize();

    });

    afterEach(function() {
      $('#stub').remove();
    });

    describe("when clicking on the button", function(){
      beforeEach(function(){
        $("#showModal").trigger("click");
      });

      it("should show the preloader", function(){
        expect($(".preloader-overlay--modal").length).to.be(1);
      });
    });
    

  }); // Given a stubbed DOM

});
