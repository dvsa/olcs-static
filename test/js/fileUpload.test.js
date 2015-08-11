describe("OLCS.fileUpload", function() {
  "use strict";

  beforeEach(function() {
    this.component = OLCS.postcodeSearch;
  });

  it("should be defined", function() {
    expect(this.component).to.exist;
  });

  it("should be a function", function() {
    expect(this.component).to.be.a("function");
  });

  describe("When initialised", function() {
    beforeEach(function() {
      this.component({
        container: ".address"
      });
    });

    describe("Given a stubbed DOM", function() {
      describe("Given the DOM is in a clean state", function() {
        beforeEach(function() {
          var stub = [
            "<div class=address id=stub data-group=a>",
              "<fieldset>",
                "<button type=submit name='address[searchPostcode][search]' class='action--primary large js-find' value=search>Find address</button>",
                "<div class=field>",
                  "<p class=hint--small id=p1><a href=#>Manual</a></p>",
                "</div>",
              "</fieldset>",
              "<div class=field id=f1><input name='a[addressLine1]' type=text /></div>",
              "<div class=field id=f2><input name='a[addressLine2]' type=text /></div>",
            "</div>"
          ].join("\n");

          this.body = $("body");
          this.body.append(stub);
        });

        afterEach(function() {
          $("#stub").remove();
        });

        it("should hide the address fields", function() {

        });
      });
    });
  });
});
