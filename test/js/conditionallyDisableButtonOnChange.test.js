/**
 * OLCS.conditionallyDisableButtonOnChange
 *
 * grunt test:single --target=conditionallyDisableButtonOnChange
 */

describe("OLCS.conditionallyDisableButtonOnChange", function () {
    "use strict";

    beforeEach(function () {
        this.component = OLCS.conditionallyDisableButtonOnChange;
    });

    it('should be defined', function () {
        expect(this.component).to.exist;
    });

    it('should be a function', function () {
        expect(this.component).to.be.a('function');
    });

    describe('Given a stubbed DOM', function () {

        beforeEach(function () {
            var template = [
                '<form id="stub" method="post" action="/baz">',
                '<div class="actions-container">',
                '<button id="generate" type="submit" value="Generate">Generate</button>',
                '<button id="publish" type="submit" value="Publish">Publish</button>',
                '</div>',
                '<table class="js-rows">',
                '<thead>',
                '<tr>',
                '<th class="" width="">Document status</th>',
                '</tr>',
                '</thead>',
                '<tr>',
                '<td data-heading="Document status">New</td>',
                '</tr>',
                '<tr>',
                '<td data-heading="Document status">Generated</td>',
                '</tr>',
                '</table>',
                '</form>'
            ].join('\n');
            this.body = $('body');
            this.body.append(template);
            this.on = sinon.spy($.fn, 'on');
        });

        afterEach(function () {
            this.on.restore();
            $('#stub').remove();
        });

        describe('when initialised with valid options', function() {

            beforeEach(function() {
                this.component({
                    dataElSelector: '[data-heading="Document status"]',
                    dataElValToCheck: 'New',
                    buttonSelector: '#publish',
                    stateAttr: 'disabled',
                    stateAttrVal: true
                });
            });

            it('should call onChange and set the buttons disabled state when a change event is triggered on the document', function() {

                $(document).change(function() {
                    console.log(document.getElementById('publish'));
                    expect($('#publish').attr('disabled')).to.equal('disabled');
                    expect($('#generate').attr('disabled')).to.equal('disabled');
                });

            });

            

        }); // when initialised with valid options

    }); // Given a stubbed DOM


});