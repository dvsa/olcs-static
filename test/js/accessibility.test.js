/*/**
 * OLCS.formErrors
 *
 * Automatically set focus to and scroll to form errors
 *
 * grunt test:single --target=formErrors
 */

/*

describe("OLCS.formErrors", function() {
  "use strict";

  beforeEach(function() {
    this.component = OLCS.formErrors;
  });

  it("should be a function", function() {
    expect(this.component).to.be.a("function");
  });

  describe("Given a page with form errors present", function() {

    beforeEach(function() {
      $("body").append([
        "<div id='stub' class='validation-summary'>",
        "</div>"
      ].join("\n"));
    });

    afterEach(function() {
      $("#stub").remove();
    });

    describe("When the component is initialised", function() {

      beforeEach(function() {
        this.component({
          container: '#stub'
        });
      });

      it("The target should be focusable by script", function() {
        expect($("#stub").attr("tabindex")).to.be("-1");
      });

      it("The target should be focused", function() {
        expect(document.activeElement.id).to.be("stub");
      });

      it("The target should be scrolled to", function() {
        expect(window.location.hash).to.be("#stub");
      });

    });

  });

});

*/

/**
 * OLCS.skipLink
 *
 * Gives focus to the content that is "skipped" to using the
 * skipToContent accessibility link
 *
 * https://code.google.com/p/chromium/issues/detail?id=262171
 * http://stackoverflow.com/questions/6280399/skip-links-not-working-in-chrome
 *
 * grunt test:single --target=skipLink
 */

/*
describe("OLCS.skipLink", function() {
  "use strict";

  beforeEach(function() {
    this.component = OLCS.skipLink;
  });

  it("should be a function", function() {
    expect(this.component).to.be.a("function");
  });

  describe("Given a trigger link and target element", function() {

    beforeEach(function() {
      $("body").append([
        "<a id='stub' class='visually-hidden' href='#main'>Skip to Main Content</a>",
        "<div id='main'></div>"
      ].join("\n"));
    });

    afterEach(function() {
      $("#stub").remove();
      $("#main").remove();
    });

    describe("When the component is initialised", function() {

      beforeEach(function() {
        this.component({
          trigger: '#stub',
          target: '#main'
        });
      });

      describe("And the trigger element is clicked", function() {

        beforeEach(function() {
          $('#stub').click();
        });

        it("The target should be removed from the tabindex", function() {
          expect($("#main").attr("tabindex")).to.be("-1");
        });

        it("The target should be focused", function() {
          expect(document.activeElement.id).to.be("main");
        });

      });

    });

  });

});
*/