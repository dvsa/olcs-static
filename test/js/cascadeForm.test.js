describe("OLCS.cascadeForm", function() {
  "use strict";

  beforeEach(function() {
    this.component = OLCS.cascadeForm;
  });

  it("should be defined", function() {
    expect(this.component).to.exist;
  });

  it("should be a function", function() {
    expect(this.component).to.be.a("function");
  });

  describe("Given a stubbed DOM", function() {
    beforeEach(function() {
      var template = [
        '<div id="stub">',
          '<form class="stub-form" action=/foo method=post>',
            '<fieldset class=f1>',
              '<input class="i1" name="foo[bar]" value="" />',
            '</fieldset>',
            '<fieldset class=f2>',
              '<input class="i2" name="bar[text]" value="bar-f2" />',
            '</fieldset>',
            '<fieldset class=f3>',
              '<input name="baz[foo]" value="" />',
              '<label class=l1>',
                '<input type="radio" name="baz[test]" value="on" />',
              '</label>',
              '<label class=l2>',
                '<input type="radio" name="baz[test]" value="off" />',
              '</label>',
            '</fieldset>',
            '<input type="submit" />',
          '</form>',
        '</div>'
      ].join("\n");

      this.body = $("body");

      this.body.append(template);

      this.on = sinon.spy($.fn, "on");
    });

    afterEach(function() {
      this.on.restore();
      $("#stub").remove();
    });

    describe("When initialised with valid options", function() {
      beforeEach(function() {
        this.component({
          form: ".stub-form",
          submit: sinon.spy(),
          rulesets: {
            "foo": true,
            "bar": function() {
              return $(".i1").val() !== "";
            },
            "baz": {
              "*": function() {
                return $(".i2").val() === "test";
              },
              "test=off": function() {
                return $(".i1").val() === "off";
              }
            }
          }
        });
      });

      it("should bind the correct change listener to the form", function() {
        expect(this.on.getCall(3).args[0]).to.equal("change");
        // NO: function.name not supported in IE8
        //expect(this.on.getCall(3).args[2].name).to.equal("checkForm");
      });

      it("should show the first fieldset", function() {
        expect($(".f1").is(":visible")).to.equal(true);
      });

      it("should hide the second fieldset", function() {
        expect($(".f2").is(":visible")).to.equal(false);
      });

      it("should hide the third fieldset", function() {
        expect($(".f3").is(":visible")).to.equal(false);
      });

      describe("When giving the first input a value", function() {
        beforeEach(function() {
          $(".i1").val("fooBar").change();
        });

        it("should show the first fieldset", function() {
          expect($(".f1").is(":visible")).to.equal(true);
        });

        it("should show the second fieldset", function() {
          expect($(".f2").is(":visible")).to.equal(true);
        });

        it("should hide the third fieldset", function() {
          expect($(".f3").is(":visible")).to.equal(false);
        });

        describe("When giving the second input a specific value", function() {
          beforeEach(function() {
            $(".i2").val("test").change();
          });

          it("should show the first fieldset", function() {
            expect($(".f1").is(":visible")).to.equal(true);
          });

          it("should show the second fieldset", function() {
            expect($(".f2").is(":visible")).to.equal(true);
          });

          it("should show the third fieldset", function() {
            expect($(".f3").is(":visible")).to.equal(true);
          });

          it("should show the third fieldset's first label", function() {
            expect($(".l1").is(":visible")).to.equal(true);
          });

          it("should hide the third fieldset's second label", function() {
            expect($(".l2").is(":visible")).to.equal(false);
          });

          describe("When updating the first input's value", function() {
            beforeEach(function() {
              $(".i1").val("off").change();
            });

            it("should show the first fieldset", function() {
              expect($(".f1").is(":visible")).to.equal(true);
            });

            it("should show the second fieldset", function() {
              expect($(".f2").is(":visible")).to.equal(true);
            });

            it("should show the third fieldset", function() {
              expect($(".f3").is(":visible")).to.equal(true);
            });

            it("should show the third fieldset's first label", function() {
              expect($(".l1").is(":visible")).to.equal(true);
            });

            it("should show the third fieldset's second label", function() {
              expect($(".l2").is(":visible")).to.equal(true);
            });
          });
        });
      });
    });
  });
});
