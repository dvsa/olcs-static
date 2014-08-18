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
        '<div id="stub">',
          '<div class="results-settings">',
            '<a href=/foo>bar</a>',
          '</div>',
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

    describe("when initialised with valid options", function() {
      beforeEach(function() {
        this.options = {
          table: "#stub"
        };
        this.component(this.options);
      });

      afterEach(function() {
        $(document).off("click");
      });

      it("binds a click handler to the correct selectors", function() {
        var str = '#stub .results-settings a, #stub .sortable a, #stub .pagination a';
        expect(this.on.firstCall.args[0]).to.equal('click');
        expect(this.on.firstCall.args[1]).to.equal(str);
      });
    });
  });
});
