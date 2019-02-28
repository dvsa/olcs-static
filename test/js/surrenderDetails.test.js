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
                '<section>',
                '<fieldset class="surrenderChecks" data-group="checks">',
                '<div class="field ">',
                '<input type="checkbox" name="checks[openCases]" class="surrenderChecks__checkbox js-surrender-checks-openCases" disabled="disabled" checked="checked" id="checks[openCases]" value="1">',
                '<label for="checks[openCases]">There are no open cases associated with this licence</label>',
                '</div>',
                '<div class="field ">',
                '<input type="checkbox" name="checks[digitalSignature]" class="surrenderChecks__checkbox js-surrender-checks-digitalSignature" required="required" id="signatureCheck" value="1">',
                '<label for="checks[digitalSignature]">Digital signature has been checked</label>',
                '</div>',
                '<div class="field ">',
                '<input type="checkbox" name="checks[ecms]" class="surrenderChecks__checkbox js-surrender-checks-ecms" required="required" id="ecmsCheck" value="1">',
                '<label for="checks[ecms]">ECMS has been checked</label>',
                '</div>',
                '</fieldset>',
                '<fieldset data-group="actions">',
                '<button type="submit" name="actions[surrender]" class="action--primary large disabled js-approve-surrender  value="" id="surrenderButton">Surrender</button>',
                '</fieldset>',
                '</section>'
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
                '<section>',
                '<fieldset class="surrenderChecks" data-group="checks">',
                '<div class="field ">',
                '<input type="checkbox" name="checks[openCases]" class="surrenderChecks__checkbox js-surrender-checks-openCases" disabled="disabled" checked="checked" id="checks[openCases]" value="1">',
                '<label for="checks[openCases]">There are no open cases associated with this licence</label>',
                '</div>',
                '<div class="field ">',
                '<input type="checkbox" name="checks[digitalSignature]" class="surrenderChecks__checkbox js-surrender-checks-digitalSignature" required="required" id="signatureCheck" value="1">',
                '<label for="checks[digitalSignature]">Digital signature has been checked</label>',
                '</div>',
                '<div class="field ">',
                '<input type="checkbox" name="checks[ecms]" class="surrenderChecks__checkbox js-surrender-checks-ecms" required="required" id="ecmsCheck" value="1">',
                '<label for="checks[ecms]">ECMS has been checked</label>',
                '</div>',
                '</fieldset>',
                '<fieldset data-group="actions">',
                '<button type="submit" name="actions[surrender]" class="action--primary large disabled js-approve-surrender  value="" id="surrenderButton">Surrender</button>',
                '</fieldset>',
                '</section>'
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
                '<section>',
                '<fieldset class="surrenderChecks" data-group="checks">',
                '<div class="field ">',
                '<input type="checkbox" name="checks[digitalSignature]" class="surrenderChecks__checkbox js-surrender-checks-digitalSignature" required="required" id="signatureCheck" value="1">',
                '<label for="checks[digitalSignature]">Digital signature has been checked</label>',
                '</div>',
                '<div class="field ">',
                '<input type="checkbox" name="checks[ecms]" class="surrenderChecks__checkbox js-surrender-checks-ecms" required="required" id="ecmsCheck" value="1">',
                '<label for="checks[ecms]">ECMS has been checked</label>',
                '</div>',
                '</fieldset>',
                '<fieldset data-group="actions">',
                '<button type="submit" name="actions[surrender]" class="action--primary large disabled js-approve-surrender  value="" id="surrenderButton">Surrender</button>',
                '</fieldset>',
                '</section>'
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
                '<section>',
                '<fieldset class="surrenderChecks" data-group="checks">',
                '<div class="field ">',
                '<input type="checkbox" name="checks[openCases]" class="surrenderChecks__checkbox js-surrender-checks-openCases" disabled="disabled" checked="checked" id="checks[openCases]" value="1">',
                '<label for="checks[openCases]">There are no open cases associated with this licence</label>',
                '</div>',
                '<div class="field ">',
                '<input type="checkbox" name="checks[busRegistrations]" class="surrenderChecks__checkbox js-surrender-checks-busRegistrations" disabled="disabled" checked="checked" id="checks[busRegistrations]" value="1">',
                '<label for="checks[busRegistrations]">There are no active bus registrations associated with this licence</label>',
                '</div>',
                '<div class="field ">',
                '<input type="checkbox" name="checks[digitalSignature]" class="surrenderChecks__checkbox js-surrender-checks-digitalSignature" required="required" id="signatureCheck" value="1">',
                '<label for="checks[digitalSignature]">Digital signature has been checked</label>',
                '</div>',
                '<div class="field ">',
                '<input type="checkbox" name="checks[ecms]" class="surrenderChecks__checkbox js-surrender-checks-ecms" required="required" id="ecmsCheck" value="1">',
                '<label for="checks[ecms]">ECMS has been checked</label>',
                '</div>',
                '</fieldset>',
                '<fieldset data-group="actions">',
                '<button type="submit" name="actions[surrender]" class="action--primary large disabled js-approve-surrender  value="" id="surrenderButton">Surrender</button>',
                '</fieldset>',
                '</section>'
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
                '<h2> Open Items</h2>',
                '<div class="table__header" id="110">',
                '<h3>4 active bus registrations associated with this licence.</h3>',
                '</div>',
                '<div class="table__wrapper">',
                '<table name="busRegistrations">',
                '<thead>',
                '<tr>',
                '<th>Reg No.</th><th>Var No.</th><th>Service No.</th><th>1st registered / cancelled</th><th>Starting point</th><th>Finishing point</th><th>Status</th></tr>',
                '</thead>',
                '<tbody>',
                '<tr>',
                '<td data-heading="Reg No."><a>PD2737280/1</a></td><td data-heading="Var No.">0</td><td data-heading="Service No.">90839 (90840, 90841)</td><td data-heading="1st registered / cancelled">15/03/2014</td><td data-heading="Starting point">Doncaster</td><td data-heading="Finishing point">Sheffield</td><td data-heading="Status">New</td>',
                '</tr>',
                '</tbody>',
                '</table>',
                '</div>',
                '<section>',
                '<fieldset class="surrenderChecks" data-group="checks">',
                '<div class="field ">',
                '<input type="checkbox" name="checks[openCases]" class="surrenderChecks__checkbox js-surrender-checks-openCases" disabled="disabled" checked="checked" id="checks[openCases]" value="1">',
                '<label for="checks[openCases]">There are no open cases associated with this licence</label>',
                '</div>',
                '<div class="field ">',
                '<input type="checkbox" name="checks[digitalSignature]" class="surrenderChecks__checkbox js-surrender-checks-digitalSignature" required="required" id="signatureCheck" value="1">',
                '<label for="checks[digitalSignature]">Digital signature has been checked</label>',
                '</div>',
                '<div class="field ">',
                '<input type="checkbox" name="checks[ecms]" class="surrenderChecks__checkbox js-surrender-checks-ecms" required="required" id="ecmsCheck" value="1">',
                '<label for="checks[ecms]">ECMS has been checked</label>',
                '</div>',
                '</fieldset>',
                '<fieldset data-group="actions">',
                '<button type="submit" name="actions[surrender]" class="action--primary large disabled js-approve-surrender  value="" id="surrenderButton">Surrender</button>',
                '</fieldset>',
                '</section>'
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
