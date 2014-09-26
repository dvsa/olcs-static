describe("OLCS.formHelper", function() {
  "use strict";

  beforeEach(function() {
    this.component = OLCS.formHelper;
  });

  it("should be defined", function() {
    expect(this.component).to.exist;
  });

  it("should be a function", function() {
    expect(this.component).to.be.a("function");
  });

  it("should also expose two helper functions", function() {
    expect(this.component.fieldset).to.be.a("function");
    expect(this.component.input).to.be.a("function");
  });

  describe("Given a stubbed jQuery object", function() {
    beforeEach(function() {
      this.find = sinon.stub($.fn, "find").returns("result");
    });

    afterEach(function() {
      this.find.restore();
    });

    describe("fieldset", function() {
      beforeEach(function() {
        this.result = this.component.fieldset("foo");
      });

      it("invokes the expected jQuery selector", function() {
        expect(this.find.secondCall.args[0]).to.equal("fieldset[data-group='foo']");
      });

      it("returns the result from $.find", function() {
        expect(this.result).to.equal("result");
      });
    });

    describe("input", function() {
      beforeEach(function() {
        this.result = this.component.input("foo", "bar");
      });

      it("invokes the expected jQuery selector", function() {
        expect(this.find.secondCall.args[0]).to.equal("[name=foo\\[bar\\]]");
      });

      it("returns the result from $.find", function() {
        expect(this.result).to.equal("result");
      });
    });

    describe("When invoking the helper function", function() {
      beforeEach(function() {
        this.fieldset = sinon.stub(this.component, "fieldset");
        this.input = sinon.stub(this.component, "input");
      });

      afterEach(function() {
        this.fieldset.restore();
        this.input.restore();
      });

      describe("With a single argument", function() {
        beforeEach(function() {
          this.result = this.component("foo");
        });

        it("invokes the fieldset method", function() {
          expect(this.fieldset.callCount).to.equal(1);
        });
      });

      describe("With two arguments", function() {
        beforeEach(function() {
          this.result = this.component("foo", "bar");
        });

        it("invokes the input method", function() {
          expect(this.input.callCount).to.equal(1);
        });
      });
    });
  });

  describe("Given a stubbed DOM", function() {
    beforeEach(function() {
      var template = [
        '<div id="stub">',
          '<form class="stub-form" action=/foo method=post>',
            '<fieldset class=f1 data-group=baz>',
              '<label class=l1>',
                '<input type="radio" name="baz[test]" value="Y" checked="" />',
              '</label>',
              '<label class=l2>',
                '<input type="radio" name="baz[test]" value="N" />',
              '</label>',
            '</fieldset>',
            '<button type=submit name=save>Save</button>',
            '<button type=submit name=cancel>Cancel</button>',
          '</form>',
        '</div>'
      ].join("\n");

      this.body = $("body");

      this.body.append(template);
    });

    afterEach(function() {
      $("#stub").remove();
    });

    describe("pressButton", function() {
      beforeEach(function() {
        this.component.pressButton(
          $(".stub-form"),
          $(".stub-form button:first")
        );
      });

      it("adds a hidden input with the value of the button", function() {
        expect($(".form__action").attr("name")).to.equal("save");
      });

      describe("buttonPressed", function() {
        describe("When invoked on the button which has been pressed", function() {
          beforeEach(function() {
            this.result = this.component.buttonPressed(
              $(".stub-form"),
              "save"
            );
          });

          it("returns the correct result", function() {
            expect(this.result).to.equal(true);
          });
        });

        describe("When invoked on a button which has not been pressed", function() {
          beforeEach(function() {
            this.result = this.component.buttonPressed(
              $(".stub-form"),
              "cancel"
            );
          });

          it("returns the correct result", function() {
            expect(this.result).to.equal(false);
          });
        });
      });
    });

    describe("isChecked", function() {
      describe("When invoked on a radio button which is checked", function() {
        beforeEach(function() {
          this.result = this.component.isChecked("baz", "test");
        });

        it("returns the correct result", function() {
          expect(this.result).to.equal(true);
        });
      });

      describe("When invoked on a radio button which does not exist", function() {
        beforeEach(function() {
          this.result = this.component.isChecked("baz", "fake");
        });

        it("returns the correct result", function() {
          expect(this.result).to.equal(false);
        });
      });
    });
  });
});
