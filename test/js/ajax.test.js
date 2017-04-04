/**
 * OLCS.modalLink
 *
 * grunt test:single --target=ajax
 */

 describe("OLCS.ajax", function() {
  "use strict";

  beforeEach(function() {
    this.component = OLCS.ajax;
  });

  it("should be a function", function() {
    expect(this.component).to.be.a("function");
  });

  describe("given a stubbed ajax mechanism", function(){
    beforeEach(function() {
        this.xhr = sinon.useFakeXMLHttpRequest();
        this.requests = [];
        this.xhr.onCreate = function(xhr) {
            this.requests.push(xhr);
        }.bind(this);
    });

    afterEach(function() {
      this.xhr.restore();
    });

    describe("when making an ajax call", function(){

      beforeEach("stub the preloader show", function(){
        this.showStub = sinon.stub(OLCS.preloader, "show");
        OLCS.ajax({url: '/foo'});
      });

      afterEach(function(){
        this.requests = [];
        this.showStub.restore();
      });

      it("should call the preloader show", function(){
        expect(this.showStub.called).to.be(true);
      });
    });

    describe("when an ajax call returns an error", function(){
      beforeEach("stub the preloader hide", function(){
        this.hideStub = sinon.stub(OLCS.preloader, "hide");
        OLCS.ajax({url: '/foo'});
        
        var responseData = JSON.stringify({foo:"bar"});
        this.requests[0].respond(400, { 'Content-Type': 'text/json' }, responseData);
      });
      afterEach(function(){
        this.requests = [];
        this.hideStub.restore();
      });

      it("should call the preloader hide", function(){
        expect(this.hideStub.called).to.be(true);
      });

    });

    describe("when making an ajax post request with no data", function(){

      beforeEach("stub the logger show", function(){
        this.warnStub = sinon.stub(OLCS.logger, "warn");
        
        OLCS.ajax({
            method: 'post',
            data: ""
          });
      });

      afterEach(function(){
        this.requests = [];
        this.showStub.restore();
      });

      it("should call the OLCS.logger warning", function(){
        expect(this.warnStub.called).to.be(true);
      });
    });

    describe("when making an ajax post request with data", function(){

      beforeEach("stub the logger show", function(){
        this.loggerStub = sinon.stub(OLCS.logger, "log");
        var postData = {foo: 'bar'};

        OLCS.ajax({
            method: 'post',
            data: postData
          });
      });

      afterEach(function(){
        this.requests = [];
        this.showStub.restore();
      });

      it("should call the OLCS.logger log", function(){
        expect(this.loggerStub.called).to.be(true);
      });
    });
  });  
});
