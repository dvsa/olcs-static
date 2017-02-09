describe("OLCS.addAnother", function() {

  "use strict";

  beforeEach(function() {
    this.component = OLCS.addAnother;
  });

  describe("given a stubbed DOM", function() {

    beforeEach(function() {
      $("body").append([
        "<div class='add-another' id=stub>",
          "<fieldset>",
            "<div class=field>",
              "<input type=text name='data[0]' id='data[0]' value='something'>",
            "</div>",
          "</fieldset>",
          "<p class=hint><input type='submit' value='Add another'></p>",
        "</div>"
      ].join("\n"));
    });

    afterEach(function() {
      $("#stub").remove();
    });

    describe("and the component is invoked", function() {

      beforeEach(function() {
        this.component();
        OLCS.eventEmitter.emit('render');
      });

      describe("when the user clicks the 'Add another' button", function() {
        beforeEach(function() {
          $("input[type=submit]").trigger("click");
        });

        it("it creates a new field", function() {
          expect($('fieldset').length).to.equal(2);
        });

        it("with correctly incremented values", function() {
          var newField = $('.add-another .field').eq(1);
          expect(newField.find('input').attr('name')).to.equal("data[1]");
          expect(newField.find('input').attr('id')).to.equal("data[1]");
          expect(newField.find('input').val()).to.equal("");
        });
      });

    });
  });
});
