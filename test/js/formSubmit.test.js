describe("OLCS.formSubmit", function() {
  
  "use strict";

  beforeEach(function() {
    this.component = OLCS.formSubmit;
  });

  it("should be a function", function() {
    expect(this.component).to.be.a("function");
  });
  
  describe("Given a form with multiple submit buttons", function() {
    
    beforeEach(function() {
      $("body").append([
        "<form id='stub' onsubmit='return false'>" +
          "<button type='submit' class='submit'>Submit</button>" +
          "<button type='submit' class='data-submit' data-onclick-become='Test Submit'>Submit</button>" +
          "<button type='submit' class='close'>Close</button>" +
        "</form>" + 
        "<button type='submit' class='fake-submit'>Fake Submit</button>"
      ].join("\n"));
    });
    
    afterEach(function() {
      $("#stub").remove();
    });
    
    describe("When invoked using basic options", function() {
      
      beforeEach(function() {
        this.component({
          form: "#stub",
          submit: "[type=submit]",
          loadText: "Loading..."
        });
      });
  
      describe("When a regular submit button is clicked", function() {
        
        beforeEach(function() {
          $('#stub .submit').click();
        });
        
        it("The submit buttons should have the 'disabled' class", function() {
          expect($("#stub [type='submit']").hasClass("disabled")).to.be(true);
        });

        it("The clicked button should have correct loading text", function() {
          expect($("#stub .submit").html()).to.be("Loading...");
        });
        
        it("All other submit buttons should remain unaffected", function() {
          expect($(".fake-submit").hasClass("disabled")).to.be(false);
          expect($(".fake-submit").html()).to.be("Fake Submit");
        });
      
      });
      
      describe("When a submit button with the 'data-onclick-become' attribute is clicked", function() {
        
        beforeEach(function() {
          $('#stub .data-submit').click();
        });

        it("The clicked button should have correct loading text", function() {
          expect($("#stub .data-submit").html()).to.be("Test Submit");
        });
        
      });
    
    });
    
  });

});