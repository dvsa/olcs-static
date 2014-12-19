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

    describe("when initialised", function() {
      beforeEach(function() {
        this.conditionalButton = sinon
        .stub(OLCS, "conditionalButton")
        .returns({
          check: sinon.spy()
        });

        this.component();
      });

      afterEach(function() {
        this.conditionalButton.restore();
        $(document).off("click");
      });

      it("binds a click handler to the correct selectors", function() {
        var str = ".table__header button, .table__wrapper input[type=submit]";
        expect(this.on.firstCall.args[0]).to.equal("click");
        expect(this.on.firstCall.args[1]).to.equal(str);
      });
    });
  });
});
