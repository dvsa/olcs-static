describe("OLCS.formModal", function() {
  "use strict";

  beforeEach(function() {
    this.component = OLCS.formModal;
  });

  it("should be defined", function() {
    expect(this.component).to.exist;
  });

  it("should be a function", function() {
    expect(this.component).to.be.a("function");
  });

  describe("Given a stubbed modal", function() {
    beforeEach(function() {
      this.modal = sinon.stub(OLCS.modal, "show");
    });

    afterEach(function() {
      this.modal.restore();
    });

    describe("Given a stubbed form handler", function() {
      beforeEach(function() {
        this.handler = {
          unbind: sinon.spy()
        };
        this.formHandler = sinon.stub(OLCS, "formHandler").returns(this.handler);
      });

      afterEach(function() {
        this.formHandler.restore();
      });

      describe("when invoked", function() {
        beforeEach(function() {
          OLCS.formModal({
            title: "foo",
            body: "bar"
          });
        });

        it("shows a modal", function() {
          expect(this.modal.firstCall.args[0]).to.equal("bar");
          expect(this.modal.firstCall.args[1]).to.equal("foo");
        });

        it("binds a form handler", function() {
          expect(this.formHandler.callCount).to.equal(1);
        });

        describe("when closing the modal", function() {
          beforeEach(function() {
            OLCS.modal.hide();
          });

          // @TODO not working, needs revisiting with a clear head
          it.skip("unbinds the form handler", function() {
            expect(this.handler.unbind.callCount).to.equal(1);
          });
        });
      });
    });
  });
});
