
describe("OLCS.formHandler", function() {
  "use strict";

  beforeEach(function() {
    this.component = OLCS.formHandler;
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
          '<form action="/foo" method="get" class="js-form">',
            '<input name="bar" type="text" />',
            '<input type="submit" />',
          '</form>',
          '<div class="container"></div>',
        '</div>'
      ].join("\n");

      this.body = $("body");

      this.body.append(template);

      this.on = sinon.spy($.prototype, "on");
    });

    afterEach(function() {
      this.on.restore();
      this.body.remove("#stub");
    });

    describe("when initialised with valid options", function() {
      beforeEach(function() {
        this.component({
          form: ".js-form",
          hideSubmit: true
        });
      });

      it("hides the submit button", function() {
        expect($("[type=submit]").is(":hidden")).to.equal(true);
      });
    });
  });
});
