describe("OLCS.textareaPlaceholder", function() {
  
  "use strict";

  beforeEach(function() {
    this.component = OLCS.textareaPlaceholder;
  });

  it("should be a function", function() {
    expect(this.component).to.be.a("function");
  });
  
  describe("Given a textarea element that has a value attribute equal to the placeholder attribute", function() {
    
    beforeEach(function() {
      $("body").append([
        "<textarea id='stub' value='Lorem Ipsum' placeholder='Lorem Ipsum'></textarea>"
      ].join("\n"));
    });
    
    afterEach(function() {
      $("#stub").remove();
    });
    
    describe("When invoked using basic options", function() {
      
      beforeEach(function() {
        this.component();
      });
    
    });
         
  });
  
});