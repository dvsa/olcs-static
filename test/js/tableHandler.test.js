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

      describe("Given a stubbed ajax mechanism", function() {
        beforeEach(function() {
          this.ajax = sinon.stub($, "get");
        });

        afterEach(function() {
          this.ajax.restore();
        });

        describe("When clicking a relevant link", function() {
          beforeEach(function() {
            $("#stub a").click();
          });

          it("invokes the expected method", function() {
            expect(this.ajax.calledOnce).to.equal(true);
          });

          it("with the expected arguments", function() {
            expect(this.ajax.firstCall.args[0]).to.equal("/foo");
            expect(this.ajax.firstCall.args[1]).to.be.a("function");
          });
        });
      });
    });
  });
});
