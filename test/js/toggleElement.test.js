describe("OLCS.toggleElement", function() {
  "use strict";

  beforeEach(function() {
    this.component = OLCS.toggleElement;
  });

  it("should be a function", function() {
    expect(this.component).to.be.a("function");
  });

  describe("Given a stubbed DOM with a trigger and a target element", function() {
    beforeEach(function() {
      $("body").append([
        "<div id=stub>",
          "<div id=trigger>Menu toggle",
            "<div id=target>Menu</div>",
          "</div>",
        "</div>"
      ].join("\n"));
    });

    afterEach(function() {
      $("#stub").remove();
    });

    describe("When invoked without any options", function() {
      beforeEach(function() {
        try {
          this.component();
        } catch (e) {
          this.e = e;
        }
      });

      it("throws the expected error", function() {
        expect(this.e.message).to.equal("OLCS.toggleElement requires a triggerSelector and an targetSelector option");
      });
    });

    describe("When invoked without a triggerSelector", function() {
      beforeEach(function() {
        try {
          this.component({
            triggerSelector: '#foo'
          });
        } catch (e) {
          this.e = e;
        }
      });

      it("throws the expected error", function() {
        expect(this.e.message).to.equal("OLCS.toggleElement requires a triggerSelector and an targetSelector option");
      });
    });

    describe("When invoked without a targetSelector", function() {
      beforeEach(function() {
        try {
          this.component({
            targetSelector: '#foo'
          });
        } catch (e) {
          this.e = e;
        }
      });

      it("throws the expected error", function() {
        expect(this.e.message).to.equal("OLCS.toggleElement requires a triggerSelector and an targetSelector option");
      });
    });


    describe("When invoked with valid options", function() {
      beforeEach(function() {
        this.options = {
          triggerSelector: "#trigger",
          targetSelector: "#target"
        };
        this.component(this.options);
      });

      describe("When the trigger element is clicked and the target element his hidden", function() {
        beforeEach(function() {
          $("#target").hide();
          $("#trigger").click();
        });

        it("Should show the target element", function() {
          expect($("#target").is(":visible")).to.be(true);
        });

        describe("When the document is clicked", function() {
          beforeEach(function() {
            $(document).click();
          });

          it("It should hide the target element", function() {
            expect($("#target").is(":visible")).to.be(false);
          });
        });
      });
    });
  });
});
