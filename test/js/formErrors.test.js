/**
 * OLCS.formErrors
 *
 * Automatically set focus to and scroll to form errors
 * 
 * grunt test:single --target=formErrors
 */

describe("OLCS.formErrors", function() {
  "use strict";

  beforeEach(function() {
    this.component = OLCS.formErrors;
  });

  it("should be a function", function() {
    expect(this.component).to.be.a("function");
  });
  
  describe("Given a page with form errors present", function() {
    
    beforeEach(function() {
      $("body").append([
        "<div id='stub' class='validation-summary'>",
        "</div>"
      ].join("\n"));
    });

    afterEach(function() {
      $("#stub").remove();
    });
    
    describe("When the component is initialised", function() {
      
      beforeEach(function() {
        this.component({
          container: '#stub'
        });
      });
      
      it("The target should be focusable by script", function() {
        expect($("#stub").attr("tabindex")).to.be("-1");
      });
    
      it("The target should be focused", function() {
        expect(document.activeElement.id).to.be("stub");
      });
    
      it("The target should be scrolled to", function() {
        expect(window.location.hash).to.be("#stub");
      });
    
    });

  });

});