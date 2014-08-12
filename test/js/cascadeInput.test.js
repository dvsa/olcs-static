
describe("OLCS.cascadeInput", function() {
  "use strict";

  beforeEach(function() {
    this.component = OLCS.cascadeInput;
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
            '<input name="bar" class="source" type="text" />',
            '<select name="baz" class="dest" type="text"></select>',
            '<input type="submit" />',
          '</form>',
        '</div>'
      ].join("\n");

      this.body = $("body");

      this.body.append(template);

      this.on = sinon.spy($.prototype, "on");
    });

    afterEach(function() {
      this.on.restore();
      $("#stub").remove();
    });

    describe("When initialised with no process callback", function() {
      beforeEach(function() {
        try {
          this.component({
            source: ".source",
            dest: ".dest"
          });
        } catch (e) {
          this.error = e;
        }
      });

      it("throws the correct error", function() {
        expect(this.error.message).to.equal("Please provide a process option");
      });
    });

    describe("When initialised with valid options", function() {
      beforeEach(function() {
        this.spy = sinon.spy();
        this.component({
          source: ".source",
          dest: ".dest",
          trap: true,
          process: this.spy
        });
      });

      afterEach(function() {
        $(document).off("change");
      });

      describe("When the source value changes", function() {
        beforeEach(function() {
          $(".source").val("foo").change();
        });

        it("invokes the process method", function() {
          expect(this.spy.callCount).to.equal(1);
        });

        describe("When the process method returns", function() {
          beforeEach(function() {
            var data = [
              {value: "1", label: "One"},
              {value: "2", label: "Two"}
            ];
            this.spy.yield(data);
          });

          it("updates the destination options", function() {
            expect($(".dest").html()).to.equal(
              "<option value=\"1\">One</option>" +
              "<option value=\"2\">Two</option>"
            );
          });
        });
      });
    });
  });
});
