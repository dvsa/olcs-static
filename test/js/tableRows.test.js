describe("OLCS.tableRows", function() {
  "use strict";

  beforeEach(function() {
    this.component = OLCS.tableRows;
  });

  it("should be a function", function() {
    expect(this.component).to.be.a("function");
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

    describe("When invoked", function() {
      beforeEach(function() {
        this.component();
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

        it("It triggers the click of it's main action", function() {   
          expect(this.buttonClickSpy.callCount).to.equal(1); 
        });
      });

      describe("When a mouse enters a table row", function() {
        beforeEach(function() {
          $("#tr1").mouseenter();
        });

        it("It attaches a class of 'hover' to the table row", function() {   
          expect($("#tr1").hasClass("hover")).to.equal(true);
        });


        // Need to figure out why the below isn't working

        // describe("And then when the mouse leaves", function() {
        //   beforeEach(function() {
        //     $("#tr1").mouseleave();
        //   });

        //   it("It removes the 'hover' class", function() {   
        //     expect($("#tr1").hasClass("hover")).to.equal(false);
        //   }); 
        // });
      });
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

    describe("When invoked", function() {
      beforeEach(function() {
        this.component();
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

        it("It doesn't trigger the click of it's main action", function() {   
          expect(this.buttonClickSpy.callCount).to.equal(0); 
        });
      });

      describe("When a mouse enters a table row", function() {
        beforeEach(function() {
          $("#tr1").mouseenter();
        });

        it("It doesn't attach a class of 'hover' to the table row", function() {   
          expect($("#tr1").hasClass("hover")).to.equal(false);
        });
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
    
    describe("When invoked", function() {
      beforeEach(function() {
        this.component();
      });

      describe("When a td is clicked that contains a select box", function() {
        beforeEach(function() {
          $("#td2").click();
        });

        it("It triggers the click of it's select box", function() {   
          expect($("#cb1").is(":checked")).to.equal(true);
        });
      });
    });
  });
});
