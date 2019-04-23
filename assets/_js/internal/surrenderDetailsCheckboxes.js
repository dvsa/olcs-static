var OLCS = OLCS || {};


OLCS.surrenderDetailsCheckboxes = (function (document, $, undefined) {
    "use strict";

    var exports = {};

    exports.init = function () {
        $(".js-surrender-checks-digitalSignature").change(function () {
            exports.saveDigitalSignatureChecked();
        });
        $(".js-surrender-checks-ecms").change(function () {
            exports.saveEcmsChecked();
        });
    };

    exports.saveDigitalSignatureChecked = function () {
        if ($(".js-surrender-checks-digitalSignature").prop("checked")) {
            $.ajax({
                type: "POST",
                url: "surrender-checks",
                data: {signatureChecked: 1},
                success: window.location.reload(true)
            });
        } else {
            $.ajax({
                type: "POST",
                url: "surrender-checks",
                data: {signatureChecked: 0},
                success: window.location.reload(true)
            });
        }
    };

    exports.saveEcmsChecked = function () {
        if ($(".js-surrender-checks-ecms").prop("checked")) {
            $.ajax({
                type: "POST",
                url: "surrender-checks",
                data: {ecmsChecked: 1},
                success: window.location.reload(true)
            });
        } else {
            $.ajax({
                type: "POST",
                url: "surrender-checks",
                data: {ecmsChecked: 0},
                success: window.location.reload(true)
            });
        }
    };

    return exports;
}(document, window.jQuery));
