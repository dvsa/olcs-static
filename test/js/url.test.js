describe("OLCS.url", function() {
  "use strict";

  beforeEach(function() {
    this.component = OLCS.url;
  });

  it("should be defined", function() {
    expect(this.component).to.exist;
  });

  it("should expose the correct public interface", function() {
    expect(this.component.isSame).to.be.a("function");
  });

  describe("isSame", function() {

    it("should return true when given matching paths", function() {
      expect(this.component.isSame("/foo/bar/", "/foo/bar/")).to.be(true);
    });

    it("should return true when given matching paths with inconsistent trailing slashes", function() {
      expect(this.component.isSame("/foo/bar/", "/foo/bar")).to.be(true);
      expect(this.component.isSame("/foo/bar", "/foo/bar/")).to.be(true);
    });

    it("should return false when given non-matching paths", function() {
      expect(this.component.isSame("/foo/bar/", "/foo/bar/baz/")).to.be(false);
    });
  });
});
