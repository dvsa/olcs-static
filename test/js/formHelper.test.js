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
      this.find = sinon.stub($, "find").returns("result");
    });

    afterEach(function() {
      this.find.restore();
    });

    describe("fieldset", function() {
      beforeEach(function() {
        this.result = this.component.fieldset("foo");
      });

      it("invokes the expected jQuery selector", function() {
        expect(this.find.firstCall.args[0]).to.equal("fieldset[data-group='foo']");
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
        expect(this.find.firstCall.args[0]).to.equal("[name=foo\\[bar\\]]");
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
});
