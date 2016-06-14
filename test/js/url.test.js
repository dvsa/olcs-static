/**
 * OLCS.url
 *
 * grunt test:single --target=url
 */

describe('OLCS.url', function() {

  'use strict';

  beforeEach(function() {
    this.component = OLCS.url;
  });

  it('should be defined', function() {
    expect(this.component).to.exist;
  });

  it('should expose the correct public interface', function() {
    expect(this.component.isSame).to.be.a('function');
    expect(this.component.isCurrent).to.be.a('function');
    expect(this.component.load).to.be.a('function');
  });

  describe('isSame', function() {

    it('should return true when given matching paths', function() {
      expect(this.component.isSame('/foo/bar/', '/foo/bar/')).to.be(true);
    });

    it('should return true when given matching paths with inconsistent trailing slashes', function() {
      expect(this.component.isSame('/foo/bar/', '/foo/bar')).to.be(true);
      expect(this.component.isSame('/foo/bar', '/foo/bar/')).to.be(true);
    });

    it('should return false when given non-matching paths', function() {
      expect(this.component.isSame('/foo/bar/', '/foo/bar/baz/')).to.be(false);
    });

  }); // isSame

  describe('isCurrent', function() {

    it('should return true when given matching paths', function() {
      expect(this.component.isCurrent(window.location.pathname)).to.be(true);
    });

  }); // isCurrent

  describe('load', function() {

    //@TODO why does this return undefined?
    it.skip('should return true when given matching paths', function() {
      expect(this.component.load(window.location.href)).to.be(true);
    });

  }); // load

});
