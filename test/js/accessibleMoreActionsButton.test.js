/**
 *
 * grunt test:single --target=accessibleMoreActionsButton
 */
describe('OLCS.accessibleMoreActionsButton', function () {
    'use strict';

    beforeEach(function () {
        this.component = OLCS.accessibleMoreActionsButton;
    });

    it('should be an object', function () {
        expect(this.component).to.be.an('object');
    });

    describe('Given the more actions button is selected', function () {
        beforeEach(function () {
            this.template = [
                '<div tabindex="0" role="button" class="more-actions active">',
                '<div class="more-actions__button">More actions</div>',
                '<div class="more-actions__list" style="display: block;">',
                '<button id="delete" class="more-actions__item action--secondary" name="table[action]" type="submit" value="Delete" data-label="Remove">Remove</button>',
                '<button id="reprint" class=" more-actions__item action--secondary" name="table[action]" type="submit" value="Reprint" data-label="Reprint Disc">Reprint Disc</button>',
                '<button id="transfer" class=" js-require--multiple action--secondary" name="table[action]" type="submit" value="Transfer" data-label="Transfer" disabled="disabled">Transfer</button>',
                '<button id="export" class=" more-actions__item js-disable-crud action--secondary" name="table[action]" type="submit" value="Export" data-label="Export">Export</button>',
                '<button id="show-removed-vehicles" class="action--secondary more-actions__item" name="table[action]" type="submit" value="Show-removed-vehicles" data-label="Show removed vehicles">Show removed vehicles</button>',
                '</div>',
                '</div>'
            ].join('\n');

            this.body = $("body");
            this.body.append(this.template);

            this.component.init();

            this.deleteButton = document.getElementById('delete');
            this.reprintButton = document.getElementById('reprint');
            this.transferButton = document.getElementById('transfer');
            this.exportButton = document.getElementById('export');
            this.ShowRemovedVehiclestButton = document.getElementById('show-removed-vehicles');

            this.deleteButtonSpy = sinon.spy(this.deleteButton, 'focus');
            this.reprintButtonSpy = sinon.spy(this.reprintButton, 'focus');
            this.transferButtonSpy = sinon.spy(this.transferButton, 'focus');
            this.exportButtonSpy = sinon.spy(this.exportButton, 'focus');
            this.ShowRemovedVehiclestButtonSpy = sinon.spy(this.ShowRemovedVehiclestButton, 'focus');
        });

        afterEach(function () {
            this.deleteButtonSpy.restore();
            this.reprintButtonSpy.restore();
            this.transferButtonSpy.restore();
            this.exportButtonSpy.restore();
            this.ShowRemovedVehiclestButtonSpy.restore();
        });

        describe('when the arrow down key is pressed', function () {
            beforeEach(function () {
                var press = jQuery.Event("keydown");
                press.ctrlKey = false;
                press.which = 40;
                $(".more-actions__list").trigger(press);

            });

            describe('and no button is focused in the button list', function () {
                it('it should focus on the first button in the list', function () {
                    expect(this.deleteButtonSpy.callCount).to.equal(1);
                });
            });

            describe('and the first button is focused in the button list', function () {
                beforeEach(function () {
                   $("#delete").focus();
                });
                it('it should focus on the second button in the list', function () {
                    expect(this.reprintButtonSpy.callCount).to.equal(1);
                });
            });
        });

    });

});