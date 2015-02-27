describe("OLCS.tableRows", function() {
  "use strict";

  beforeEach(function() {
    this.component = OLCS.tableRows;
  });

  it("should be a function", function() {
    expect(this.component).to.be.a("function");
  });

  describe("When invoked", function() {
    beforeEach(function() {
      this.component();
    });

    afterEach(function() {
      $(document).off("click", "tbody tr");
      $(document).off("mousenter", "tbody tr");
      $(document).off("mouseleave", "tbody tr");
    });

    describe("Given a stubbed DOM with a table row which contains a single action", function() {
      beforeEach(function() {
        $("body").append([
          "<tbody id=tbody>",
            "<tr id=tr1>",
              "<td id=td1><a href=# id=l1></a></td>",
              "<td id=td2></td>",
              "<td id=td3><input type=checkbox id=cb1></td>",
            "</tr>",
          "</tbody>"
        ].join("\n"));
      });

      afterEach(function() {
        $("#tbody").remove();
      });

      describe("When the table row is clicked", function() {
        beforeEach(function() {
          this.buttonClickSpy = sinon.spy();
          $("#l1").on("click", this.buttonClickSpy);
          $("#td2").click();
        });

        afterEach(function(){
          $("#l1").off("click", this.buttonClickSpy);
        });

        // @FIXME: fails in PhantomJS, passes in all real browsers
        // boils down to the .click() call inside the component being
        // called on the raw DOM element; this isn't officially supported
        //
        // In any case, some of the component could do with a tidy anyway
        // so revisit on another day
        it.skip("triggers the click of its main action", function() {
          expect(this.buttonClickSpy.callCount).to.equal(1);
        });
      });

      describe("When a mouse enters a table row", function() {
        beforeEach(function() {
          $("#tr1").mouseenter();
        });

        it("attaches a class of 'hover' to the table row", function() {
          expect($("#tr1").hasClass("hover")).to.equal(true);
        });


        // Need to figure out why the below isn't working

        // describe("And then when the mouse leaves", function() {
        //   beforeEach(function() {
        //     $("#tr1").mouseleave();
        //   });

        //   it("removes the 'hover' class", function() {
        //     expect($("#tr1").hasClass("hover")).to.equal(false);
        //   });
        // });
      });
    });

    describe("Given a stubbed DOM with a table row which contains more than one action", function() {
      beforeEach(function() {
        $("body").append([
          "<tbody id=tbody>",
            "<tr id=tr1>",
              "<td id=td1><a href=# id=l1></a></td>",
              "<td id=td2></td>",
              "<td id=td3><a href=# id=l2></a></td>",
              "<td id=td4><input type=radio id=r1></td>",
            "</tr>",
          "</tbody>"
        ].join("\n"));
      });

      afterEach(function() {
        $("#tbody").remove();
      });

      describe("When the table row is clicked", function() {
        beforeEach(function() {
          this.buttonClickSpy = sinon.spy();
          $("#td1").on("click", this.buttonClickSpy);
          $("#td2").click();
        });

        afterEach(function(){
          $("#td1").off("click");
        });

        it("doesn't trigger the click of its main action", function() {
          expect(this.buttonClickSpy.callCount).to.equal(0);
        });
      });

      describe("When a mouse enters a table row", function() {
        beforeEach(function() {
          $("#tr1").mouseenter();
        });

        it("doesn't attach a class of 'hover' to the table row", function() {
          expect($("#tr1").hasClass("hover")).to.equal(false);
        });
      });
    });

    describe("Given a stubbed DOM with a table row which contains a select element", function() {
      beforeEach(function() {
        $("body").append([
          "<tbody id=tbody>",
            "<tr id=tr1>",
              "<td id=td1><a href=#></a></td>",
              "<td id=td2><input type=checkbox id=cb1></td>",
            "</tr>",
          "</tbody>"
        ].join("\n"));
      });

      afterEach(function() {
        $("#tbody").remove();
      });

      describe("When a td is clicked that contains a select box", function() {
        beforeEach(function() {
          $("#td2").click();
        });

        it("triggers the click of its select box", function() {
          expect($("#cb1").is(":checked")).to.equal(true);
        });
      });
    });
  });
});
