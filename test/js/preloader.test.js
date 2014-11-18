describe("OLCS.preloader", function() {
  "use strict";

  beforeEach(function() {
    this.component = OLCS.preloader;
  });

  it("should be defined", function() {
    expect(this.component).to.exist;
  });

  it("should expose the correct public interface", function() {
    expect(this.component.show).to.be.a("function");
    expect(this.component.hide).to.be.a("function");
  });

  describe("Given a stubbed empty DOM", function() {
    beforeEach(function() {
      $(".preloader__wrapper").remove();
    });

    describe("show", function() {
      beforeEach(function() {
        this.component.show();
      });

      it("shows the preloader wrapper", function() {
        expect($(".preloader__wrapper").is(":visible")).to.be(true);
      });

      it("shows the preloader", function() {
        expect($(".preloader").is(":visible")).to.be(true);
      });

      it("shows the preloader icon", function() {
        expect($(".preloader__icon").is(":visible")).to.be(true);
      });

      describe("When called again", function() {
        beforeEach(function() {
          this.component.show();
        });

        it("still shows the preloader wrapper", function() {
          expect($(".preloader__wrapper").is(":visible")).to.be(true);
        });

        describe("When calling hide", function() {
          beforeEach(function() {
            this.fadeOut = sinon.spy($.fn, "fadeOut");

            this.component.hide();
          });

          afterEach(function() {
            this.fadeOut.restore();
          });

          it("does not hide the preloader", function() {
            expect(this.fadeOut.callCount).to.eql(0);
          });

          describe("When calling hide again", function() {
            beforeEach(function() {
              this.component.hide();
            });

            it("hides the preloader", function() {
              expect(this.fadeOut.callCount).to.eql(1);
            });
          });
        });
      });
    });
  });
});
