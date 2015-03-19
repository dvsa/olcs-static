describe("OLCS.modalAjax", function() {
  "use strict";

  beforeEach(function() {
    this.component = OLCS.modalAjax;
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
          '<a href="/foo" class="js-modal one">foo</a>',
          '<a href="/foo" class="js-modal two"></a>',
          '<a href="/bar" class="js-modal three"></a>',
        '</div>'
      ].join("\n");

      this.body = $("body");

      this.body.append(template);

      // @todo Why doesn't sinon.spy work here
      this.modal = sinon.stub(OLCS.modal, "hide");

      this.on = sinon.spy($.prototype, "on");
    });

    afterEach(function() {
      this.on.restore();
      this.modal.restore();
      $("#stub").remove();
    });

    describe("when initialised with valid options", function() {
      beforeEach(function() {
        this.options = {
          trigger: ".js-modal"
        };
        this.component(this.options);
      });

      afterEach(function() {
        // have to clean up our event handlers otherwise they'll stack up
        $(document).off("click");
      });

      it("binds the correct click listener", function() {
        var call = this.on.getCall(0);
        expect(call.args[0]).to.equal("click");
        expect(call.args[1]).to.equal(".js-modal");
      });

      describe("Given a stubbed ajax mechanism", function() {
        beforeEach(function() {
          this.ajax = sinon.stub(OLCS, "ajax");
        });

        afterEach(function() {
          this.ajax.restore();
        });

        describe("when triggering a modal", function() {
          beforeEach(function() {
            $(".js-modal:eq(0)").click();
          });

          it("makes an ajax request", function() {
            expect(this.ajax.calledOnce).to.equal(true);
          });

          it("with the correct URL", function() {
            expect(this.ajax.firstCall.args[0].url).to.equal("/foo");
          });

          describe("Given the request returns successfully", function() {
            beforeEach(function() {
              this.spy = sinon.stub(OLCS, "formModal");
            });

            afterEach(function() {
              this.spy.restore();
            });

            describe("with no content fragment identifier", function() {
              beforeEach(function() {
                this.ajax.yieldTo("success", "dummy response data");
              });

              it("shows a form modal", function() {
                expect(this.spy.called).to.be(true);
              });

              describe("when showing another modal with a different href", function() {
                beforeEach(function() {
                  $(".js-modal:eq(2)").click();
                });

                it("makes a new ajax request", function() {
                  expect(this.ajax.calledTwice).to.be(true);
                });
              });
            });
          });
        });
      });
    });
  });
});
