describe("OLCS.tableHandler", function() {
  "use strict";

  beforeEach(function() {
    this.component = OLCS.tableHandler;
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
        '<form id="stub" method="post" action="/baz">',
          '<div class=table__header>',
            '<input name=action value=Action1 />',
            '<input name=action value=Action2 />',
          '</div>',
          '<div class=table__wrapper>',
            '<div class="results-settings">',
              '<a href=/foo>bar</a>',
            '</div>',
          '</div>',
        '</form>'
      ].join("\n");

      this.body = $("body");

      this.body.append(template);

      this.on = sinon.spy($.fn, "on");
    });

    afterEach(function() {
      this.on.restore();
      $("#stub").remove();
    });

    describe("when initialised with valid options", function() {
      beforeEach(function() {
        this.conditionalButton = sinon
        .stub(OLCS, "conditionalButton")
        .returns({
          check: sinon.spy()
        });

        this.options = {
          table: "#stub",
          container: "#stub"
        };
        this.component(this.options);
      });

      afterEach(function() {
        this.conditionalButton.restore();
        $(document).off("click");
      });

      it("binds a click handler to the correct selectors", function() {
        var str = "#stub .table__header [name=action], .table__empty button, .table__wrapper input[type=submit], " +
          ".table__header [name='table[action]']";
        expect(this.on.firstCall.args[0]).to.equal('click');
        expect(this.on.firstCall.args[1]).to.equal(str);
      });

      describe("Given a stubbed OLCS.formAjax component", function() {
        beforeEach(function() {
          this.formAjax = sinon.stub(OLCS, "formAjax");
        });

        afterEach(function() {
          this.formAjax.restore();
        });

        describe("When clicking a relevant action button", function() {
          beforeEach(function() {
            $(".table__header input:first").click();
          });

          it("invokes OLCS.formAjax", function() {
            expect(this.formAjax.calledOnce).to.equal(true);
          });

          describe("When the ajax call returns successfully", function() {
            beforeEach(function() {
              this.modal = sinon.stub(OLCS.modal, "show");
              var data = {
                body: "foo",
                title: "bar"
              };
              this.formAjax.yieldTo("success", data);
            });

            afterEach(function() {
              this.modal.restore();
            });

            it("shows a modal", function() {
              expect(this.modal.firstCall.args[0]).to.equal("foo");
              expect(this.modal.firstCall.args[1]).to.equal("bar");
            });
          });
        });
      });
    });
  });
});
