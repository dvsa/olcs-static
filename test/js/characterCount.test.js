describe("OLCS.characterCount", function() {
  "use strict";

  beforeEach(function() {
    this.component = OLCS.characterCount;
  });

  it("should be a function", function() {
    expect(this.component).to.be.a("function");
  });

  describe("given a stubbed DOM with an empty textarea", function() {
    beforeEach(function() {
      $("body").append("<textarea id=foo></textarea>");
    });

    afterEach(function() {
      $("#foo").remove();
    });

    describe("when invoked with a selector", function() {
      beforeEach(function() {
        this.options = {
          selector: "#foo"
        };
        this.component(this.options);
      });

      afterEach(function() {
        $(".character-count").remove();
      });

      it("then a character count should be inserted into the DOM", function() {
        expect($(".character-count").length).to.equal(1);
      });

      it("and the character count should be '0'", function() {
        expect($(".character-count").text()).to.be("0 characters");
      });

      describe("when the textarea is updated", function() {
        beforeEach(function() {
          $('#foo').val("cellar door").keyup();
        });

        afterEach(function() {
          $('#foo').val("");
        });

        it("then the character count should reflect the number of characters in the textarea", function() {
          expect($(".character-count").text()).to.be("10 characters");
        });
      });

    });
  });

  describe("given a stubbed DOM with prepopulated textarea", function() {
    beforeEach(function() {
      $("body").append("<textarea id=foo></textarea>");
      $("#foo").val("cellar door");
    });

    afterEach(function() {
      $("#foo").remove();
    });

    describe("when invoked with a selector", function() {
      beforeEach(function() {
        this.options = {
          selector: "#foo"
        };
        this.component(this.options);
      });

      afterEach(function() {
        $(".character-count").remove();
      });

      it("then the character count should immediately display the number of characters in the textarea", function() {
        expect($(".character-count").text()).to.be("10 characters");
      });
    });
  });

});
