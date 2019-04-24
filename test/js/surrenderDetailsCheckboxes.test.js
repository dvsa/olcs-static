/**
 * grunt test:single --target=surrenderDetailsCheckboxes
 */
describe('surrenderDetailsCheckboxes', function () {

    'use strict';

    beforeEach(function () {
        this.component = OLCS.surrenderDetailsCheckboxes;
    });

    it('should be an object', function () {
        expect(this.component).to.be.an('object');
    });

    describe('Given a stubbed DOM', function () {
        beforeEach(function () {
            this.template = [
                '<input type="checkbox" name="checks[digitalSignature]" class="surrenderChecks__checkbox js-surrender-checks-digitalSignature" required="required" id="signatureCheck" value="1">',
                '<input type="checkbox" name="checks[ecms]" class="surrenderChecks__checkbox js-surrender-checks-ecms" required="required" id="ecmsCheck" value="1">',
            ].join('\n');
            this.body = $("body");
            this.body.append(this.template);
        });

        describe("when initialised with appropriate options", function () {
            beforeEach(function () {
                this.jQueryOnStub = sinon.stub($.fn, 'on');
                this.component.init();
            });

            afterEach(function () {
                $(document).off("change");
                this.jQueryOnStub.restore();
            });

            it("should add change event handlers", function () {
                expect(this.jQueryOnStub.callCount).to.equal(2);
            });

        });
    });

    describe('Given the digital signature checkbox is unchecked', function () {
        beforeEach(function () {
            this.template = [
                '<input type="checkbox" name="checks[digitalSignature]" class="surrenderChecks__checkbox js-surrender-checks-digitalSignature" required="required" id="signatureCheck" value="1">',
            ].join('\n');

            this.body = $("body");
            this.body.append(this.template);

            this.component.init();

            this.signatureCheck = document.getElementById('signatureCheck');

            this.xhr = sinon.useFakeXMLHttpRequest();
            this.requests = [];
            this.xhr.onCreate = function(xhr) {
                this.requests.push(xhr);
            }.bind(this);
                this.signatureCheck.click();
        });

        afterEach(function () {
            this.xhr.restore();
        });

        describe("when the digital signature checkbox is checked", function () {

            it("should send an ajax request", function () {
                expect(this.requests.length).to.equal(1);
            });

            it("with the correct url", function () {
                expect(this.requests[0].url).to.equal('surrender-checks');
            });

            it("and the correct data", function () {
                expect(this.requests[0].requestBody).to.equal("signatureChecked=1");
            })
        });
    });

    describe('Given the digital signature checkbox is checked', function () {
        beforeEach(function () {
            this.template = [
                '<input type="checkbox" name="checks[digitalSignature]" class="surrenderChecks__checkbox js-surrender-checks-digitalSignature" required="required" id="signatureCheck" value="1">',
            ].join('\n');

            this.body = $("body");
            this.body.append(this.template);

            this.component.init();

            this.signatureCheck = document.getElementById('signatureCheck');
            this.signatureCheck.checked = true;

            this.xhr = sinon.useFakeXMLHttpRequest();
            this.requests = [];
            this.xhr.onCreate = function(xhr) {
                this.requests.push(xhr);
            }.bind(this);
            this.signatureCheck.click();
        });

        afterEach(function () {
            this.xhr.restore();
        });

        describe("when the digital signature checkbox is unchecked", function () {

            it("should send an ajax request", function () {
                expect(this.requests.length).to.equal(1);
            });

            it("with the correct url", function () {
                expect(this.requests[0].url).to.equal('surrender-checks');
            });

            it("and the correct data", function () {
                expect(this.requests[0].requestBody).to.equal("signatureChecked=0");
            })
        });
    });

    describe('Given the ecms checkbox is unchecked', function () {
        beforeEach(function () {
            this.template = [
                '<input type="checkbox" name="checks[ecms]" class="surrenderChecks__checkbox js-surrender-checks-ecms" required="required" id="ecmsCheck" value="1">',
            ].join('\n');

            this.body = $("body");
            this.body.append(this.template);

            this.component.init();

            this.ecmsCheck = document.getElementById('ecmsCheck');
            this.ecmsCheck.checked = false;

            this.xhr = sinon.useFakeXMLHttpRequest();
            this.requests = [];
            this.xhr.onCreate = function(xhr) {
                this.requests.push(xhr);
            }.bind(this);
            this.ecmsCheck.click();
        });

        afterEach(function () {
            this.xhr.restore();
        });

        describe("when the ecms checkbox is checked", function () {

            it("should send an ajax request", function () {
                expect(this.requests.length).to.equal(1);
            });

            it("with the correct url", function () {
                expect(this.requests[0].url).to.equal('surrender-checks');
            });

            it("and the correct data", function () {
                expect(this.requests[0].requestBody).to.equal("ecmsChecked=1");
            })
        });
    });

    describe('Given the ecms checkbox is checked', function () {
        beforeEach(function () {
            this.template = [
                '<input type="checkbox" name="checks[ecms]" class="surrenderChecks__checkbox js-surrender-checks-ecms" required="required" id="ecmsCheck" value="1">',
            ].join('\n');

            this.body = $("body");
            this.body.append(this.template);

            this.component.init();

            this.ecmsCheck = document.getElementById('ecmsCheck');
            this.ecmsCheck.checked = true;

            this.xhr = sinon.useFakeXMLHttpRequest();
            this.requests = [];
            this.xhr.onCreate = function(xhr) {
                this.requests.push(xhr);
            }.bind(this);
            this.ecmsCheck.click();
        });

        afterEach(function () {
            this.xhr.restore();
        });

        describe("when the ecms checkbox is unchecked", function () {

            it("should send an ajax request", function () {
                expect(this.requests.length).to.equal(1);
            });

            it("with the correct url", function () {
                expect(this.requests[0].url).to.equal('surrender-checks');
            });

            it("and the correct data", function () {
                expect(this.requests[0].requestBody).to.equal("ecmsChecked=0");
            })
        });
    });


});