describe("OLCS.crudTableHandler", function() {
  "use strict";

  beforeEach(function() {
    this.component = OLCS.crudTableHandler;
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
            '<input name=action value=Action1 type=submit id=submit1 />',
            '<input name=action value=Action2 type=submit id=submit2 />',
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

    describe("when initialised", function() {
      beforeEach(function() {
        this.conditionalButton = sinon
          .stub(OLCS, "conditionalButton")
          .returns({
            check: sinon.spy()
          });

        this.formHelperStub = {
          pressButton: sinon.spy()
        };

        this.formHelper = sinon
          .stub(OLCS, "formHelper")
          .returns(this.formHelperStub);

        this.component({});

        this.handleCrudClick = this.on.firstCall.args[2];
      });

      afterEach(function() {

        this.conditionalButton.restore();

        this.formHelper.restore();

        $(document).off("click");
      });

      it("binds a click handler to the correct selectors", function() {
        var str = ".table__header button, .table__wrapper input[type=submit], .table__empty button";
        expect(this.on.firstCall.args[0]).to.equal("click");
        expect(this.on.firstCall.args[1]).to.equal(str);
      });

      describe("When triggering the on click handler", function() {
        beforeEach(function() {

          this.formAjaxStub = sinon.spy();

          this.formAjax = sinon
            .stub(OLCS, "formAjax")
            .returns(this.formAjaxStub);

          this.handleCrudClick.call(
            $("#submit1"),
            {
              preventDefault: sinon.spy()
            }
          );
        });

        afterEach(function() {
          this.formAjax.restore();
        });

        // @TODO fix and re-implement
        xit("marks the button as being pressed", function() {
          expect(this.formHelperStub.pressButton.callCount).to.eql(1);
        });
      });
    });
  });
});
