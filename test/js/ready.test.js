describe("OLCS.ready", function() {
  "use strict";

  beforeEach(function() {
    this.component = OLCS.ready;
  });

  it("should be a function", function() {
    expect(this.component).to.be.a("function");
  });

  describe("When invoked without a function", function() {
    beforeEach(function() {
      try {
        OLCS.ready("foo");
      } catch (e) {
        this.e = e;
      }
    });

    it("throws the correct error", function() {
      expect(this.e.message).to.equal("Please supply a function to OLCS.ready");
    });
  });

  describe("Given a stubbed jQuery object", function() {
    beforeEach(function() {
      this.stub = sinon.stub($.fn, "ready");
    });

    afterEach(function() {
      this.stub.restore();
    });

    describe("When invoked with a function", function() {
      beforeEach(function() {
        this.foo = function() {
          return "foo function invoked";
        };

        OLCS.ready(this.foo);
      });

      it("invokes jQuery's on ready handler with the function", function() {
        expect(this.stub.firstCall.args[0]).to.equal(this.foo);
      });

      /**
       * the below doesn't work; because we set up and tear down our stubs
       * each time our stub count is back to zero, but our *cache* has
       * persisted...
       */
      describe.skip("When invoked again with the same function", function() {
        beforeEach(function() {
          OLCS.ready(this.foo);
        });

        it("does not invoke on ready again", function() {
          expect(this.stub.callCount).to.equal(1);
        });
      });
    });
  });
});
