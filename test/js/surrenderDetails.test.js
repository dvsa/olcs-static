/**
 *
 * grunt test:single --target=surrenderDetails
 */
describe('OLCS.surrenderDetails', function () {

    'use strict';

    beforeEach(function () {
        this.component = OLCS.surrenderDetails;
    });


    it('should be an object', function () {
        expect(this.component).to.be.an('object');
    });

    describe('Given a stubbed DOM', function () {
        beforeEach(function () {
            this.template = [
                '<input type="checkbox" name="checks[openCases]" class="surrenderChecks__checkbox js-surrender-checks-openCases" disabled="disabled" checked="checked" id="checks[openCases]" value="1">',
                '<input type="checkbox" name="checks[digitalSignature]" class="surrenderChecks__checkbox js-surrender-checks-digitalSignature" required="required" id="signatureCheck" value="1">',
                '<input type="checkbox" name="checks[ecms]" class="surrenderChecks__checkbox js-surrender-checks-ecms" required="required" id="ecmsCheck" value="1">',
                '<button type="submit" name="actions[surrender]" class="action--primary large disabled js-approve-surrender  value="" id="surrenderButton">Surrender</button>'
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

    describe('Given a surrender for a GV licence with no open cases', function () {
        beforeEach(function () {
            this.template = [
                '<input type="checkbox" name="checks[openCases]" class="surrenderChecks__checkbox js-surrender-checks-openCases" disabled="disabled" checked="checked" id="checks[openCases]" value="1">',
                '<input type="checkbox" name="checks[digitalSignature]" class="surrenderChecks__checkbox js-surrender-checks-digitalSignature" required="required" id="signatureCheck" value="1">',
                '<input type="checkbox" name="checks[ecms]" class="surrenderChecks__checkbox js-surrender-checks-ecms" required="required" id="ecmsCheck" value="1">',
                '<button type="submit" name="actions[surrender]" class="action--primary large disabled js-approve-surrender  value="" id="surrenderButton">Surrender</button>'
            ].join('\n');

            this.body = $("body");
            this.body.append(this.template);

            this.surrenderButton = document.getElementById('surrenderButton');
            this.signatureCheck = document.getElementById('signatureCheck');
            this.ecmsCheck = document.getElementById('ecmsCheck');
        });

        describe("when digital signature and ecms are unchecked", function () {
            beforeEach(function () {
                this.signatureCheck.checked = false;
                this.ecmsCheck.checked = false;
                this.component.toggleSurrender();
            });

            it("should not enable the surrender button", function () {
                expect(this.surrenderButton.classList.contains('disabled')).to.equal(true);
            });
        });

        describe("when only digital signature is checked", function () {
            beforeEach(function () {
                this.signatureCheck.checked = true;
                this.ecmsCheck.checked = false;
                this.component.toggleSurrender();
            });

            it("should not enable the surrender button", function () {
                expect(this.surrenderButton.classList.contains('disabled')).to.equal(true);
            });
        });

        describe("when only ecms is checked", function () {
            beforeEach(function () {
                this.signatureCheck.checked = false;
                this.ecmsCheck.checked = true;
                this.component.toggleSurrender();
            });

            it("should not enable the surrender button", function () {
                expect(this.surrenderButton.classList.contains('disabled')).to.equal(true);
            });
        });

        describe("when digital signature and ecms are checked", function () {
            beforeEach(function () {
                this.signatureCheck.checked = true;
                this.ecmsCheck.checked = true;
                this.component.toggleSurrender();
            });

            it("should enable the surrender button", function () {
                expect(this.surrenderButton.classList.contains('disabled')).to.equal(false);
            });

            describe('when digital signature is unchecked', function () {
                beforeEach( function () {
                    this.signatureCheck.checked = false;
                    this.ecmsCheck.checked = true;
                    this.component.toggleSurrender();
                });

                it('should disable the surrender button', function () {
                    expect(this.surrenderButton.classList.contains('disabled')).to.equal(true);
                });
            });

            describe('when ecms is unchecked', function () {
                beforeEach( function () {
                    this.signatureCheck.checked = true;
                    this.ecmsCheck.checked = false;
                    this.component.toggleSurrender();
                });

                it('should disable the surrender button', function () {
                    expect(this.surrenderButton.classList.contains('disabled')).to.equal(true);
                });
            });
        });

        afterEach(function () {
            $('#stub').remove();
        });

    });

    describe('Given a surrender for a GV licence with open cases', function () {
        beforeEach(function () {
            this.template = [
                '<input type="checkbox" name="checks[digitalSignature]" class="surrenderChecks__checkbox js-surrender-checks-digitalSignature" required="required" id="signatureCheck" value="1">',
                '<input type="checkbox" name="checks[ecms]" class="surrenderChecks__checkbox js-surrender-checks-ecms" required="required" id="ecmsCheck" value="1">',
                '<button type="submit" name="actions[surrender]" class="action--primary large disabled js-approve-surrender  value="" id="surrenderButton">Surrender</button>'
            ].join('\n');

            this.body = $("body");
            this.body.append(this.template);

            this.surrenderButton = document.getElementById('surrenderButton');
            this.signatureCheck = document.getElementById('signatureCheck');
            this.ecmsCheck = document.getElementById('ecmsCheck');
        });

        describe("when digital signature and ecms are unchecked", function () {
            beforeEach(function () {
                this.signatureCheck.checked = false;
                this.ecmsCheck.checked = false;
                this.component.toggleSurrender();
            });

            it("should not enable the surrender button", function () {
                expect(this.surrenderButton.classList.contains('disabled')).to.equal(true);
            });
        });

        describe("when only digital signature is checked", function () {
            beforeEach(function () {
                this.signatureCheck.checked = true;
                this.ecmsCheck.checked = false;
                this.component.toggleSurrender();
            });

            it("should not enable the surrender button", function () {
                expect(this.surrenderButton.classList.contains('disabled')).to.equal(true);
            });
        });

        describe("when only ecms is checked", function () {
            beforeEach(function () {
                this.signatureCheck.checked = false;
                this.ecmsCheck.checked = true;
                this.component.toggleSurrender();
            });

            it("should not enable the surrender button", function () {
                expect(this.surrenderButton.classList.contains('disabled')).to.equal(true);
            });
        });

        describe("when digital signature and ecms are checked", function () {
            beforeEach(function () {
                this.signatureCheck.checked = true;
                this.ecmsCheck.checked = true;
                this.component.toggleSurrender();
            });

            it("should not enable the surrender button", function () {
                expect(this.surrenderButton.classList.contains('disabled')).to.equal(true);
            });
        });

        afterEach(function () {
            $('#stub').remove();
        });

    });

    describe('Given a surrender for a PSV licence with no open cases and no bus registrations', function () {
        beforeEach(function () {
            this.template = [
                '<input type="checkbox" name="checks[openCases]" class="surrenderChecks__checkbox js-surrender-checks-openCases" disabled="disabled" checked="checked" id="checks[openCases]" value="1">',
                '<input type="checkbox" name="checks[busRegistrations]" class="surrenderChecks__checkbox js-surrender-checks-busRegistrations" disabled="disabled" checked="checked" id="checks[busRegistrations]" value="1">',
                '<input type="checkbox" name="checks[digitalSignature]" class="surrenderChecks__checkbox js-surrender-checks-digitalSignature" required="required" id="signatureCheck" value="1">',
                '<input type="checkbox" name="checks[ecms]" class="surrenderChecks__checkbox js-surrender-checks-ecms" required="required" id="ecmsCheck" value="1">',
                '<button type="submit" name="actions[surrender]" class="action--primary large disabled js-approve-surrender  value="" id="surrenderButton">Surrender</button>'
            ].join('\n');

            this.body = $("body");
            this.body.append(this.template);

            this.surrenderButton = document.getElementById('surrenderButton');
            this.signatureCheck = document.getElementById('signatureCheck');
            this.ecmsCheck = document.getElementById('ecmsCheck');
        });

        describe("when digital signature and ecms are unchecked", function () {
            beforeEach(function () {
                this.signatureCheck.checked = false;
                this.ecmsCheck.checked = false;
                this.component.toggleSurrender();
            });

            it("should not enable the surrender button", function () {
                expect(this.surrenderButton.classList.contains('disabled')).to.equal(true);
            });
        });

        describe("when only digital signature is checked", function () {
            beforeEach(function () {
                this.signatureCheck.checked = true;
                this.ecmsCheck.checked = false;
                this.component.toggleSurrender();
            });

            it("should not enable the surrender button", function () {
                expect(this.surrenderButton.classList.contains('disabled')).to.equal(true);
            });
        });

        describe("when only ecms is checked", function () {
            beforeEach(function () {
                this.signatureCheck.checked = false;
                this.ecmsCheck.checked = true;
                this.component.toggleSurrender();
            });

            it("should not enable the surrender button", function () {
                expect(this.surrenderButton.classList.contains('disabled')).to.equal(true);
            });
        });

        describe("when digital signature and ecms are checked", function () {
            beforeEach(function () {
                this.signatureCheck.checked = true;
                this.ecmsCheck.checked = true;
                this.component.toggleSurrender();
            });

            it("should enable the surrender button", function () {
                expect(this.surrenderButton.classList.contains('disabled')).to.equal(false);
            });

            describe('when digital signature is unchecked', function () {
                beforeEach( function () {
                    this.signatureCheck.checked = false;
                    this.ecmsCheck.checked = true;
                    this.component.toggleSurrender();
                });

                it('should disable the surrender button', function () {
                    expect(this.surrenderButton.classList.contains('disabled')).to.equal(true);
                });
            });

            describe('when ecms is unchecked', function () {
                beforeEach( function () {
                    this.signatureCheck.checked = true;
                    this.ecmsCheck.checked = false;
                    this.component.toggleSurrender();
                });

                it('should disable the surrender button', function () {
                    expect(this.surrenderButton.classList.contains('disabled')).to.equal(true);
                });
            });
        });

        afterEach(function () {
            $('#stub').remove();
        });

    });

    describe('Given a surrender for a PSV licence with no open cases and bus registrations', function () {
        beforeEach(function () {
            this.template = [
                '<table name="busRegistrations">',
                '<tbody>',
                '</tbody>',
                '</table>',
                '<input type="checkbox" name="checks[openCases]" class="surrenderChecks__checkbox js-surrender-checks-openCases" disabled="disabled" checked="checked" id="checks[openCases]" value="1">',
                '<input type="checkbox" name="checks[digitalSignature]" class="surrenderChecks__checkbox js-surrender-checks-digitalSignature" required="required" id="signatureCheck" value="1">',
                '<input type="checkbox" name="checks[ecms]" class="surrenderChecks__checkbox js-surrender-checks-ecms" required="required" id="ecmsCheck" value="1">',
                '<button type="submit" name="actions[surrender]" class="action--primary large disabled js-approve-surrender  value="" id="surrenderButton">Surrender</button>'
            ].join('\n');

            this.body = $("body");
            this.body.append(this.template);

            this.surrenderButton = document.getElementById('surrenderButton');
            this.signatureCheck = document.getElementById('signatureCheck');
            this.ecmsCheck = document.getElementById('ecmsCheck');
        });

        describe("when digital signature and ecms are unchecked", function () {
            beforeEach(function () {
                this.signatureCheck.checked = false;
                this.ecmsCheck.checked = false;
                this.component.toggleSurrender();
            });

            it("should not enable the surrender button", function () {
                expect(this.surrenderButton.classList.contains('disabled')).to.equal(true);
            });
        });

        describe("when only digital signature is checked", function () {
            beforeEach(function () {
                this.signatureCheck.checked = true;
                this.ecmsCheck.checked = false;
                this.component.toggleSurrender();
            });

            it("should not enable the surrender button", function () {
                expect(this.surrenderButton.classList.contains('disabled')).to.equal(true);
            });
        });

        describe("when only ecms is checked", function () {
            beforeEach(function () {
                this.signatureCheck.checked = false;
                this.ecmsCheck.checked = true;
                this.component.toggleSurrender();
            });

            it("should not enable the surrender button", function () {
                expect(this.surrenderButton.classList.contains('disabled')).to.equal(true);
            });
        });

        describe("when digital signature and ecms are checked", function () {
            beforeEach(function () {
                this.signatureCheck.checked = true;
                this.ecmsCheck.checked = true;
                this.component.toggleSurrender();
            });

            it("should not enable the surrender button", function () {
                expect(this.surrenderButton.classList.contains('disabled')).to.equal(true);
            });
        });

        afterEach(function () {
            $('#stub').remove();
        });

    });


});
