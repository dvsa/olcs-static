var OLCS = OLCS || {};


OLCS.surrenderDetailsCheckboxes = (function (document, $, undefined) {
    "use strict";

    var exports = {};

    exports.init = function () {
        $(".js-surrender-checks-digitalSignature").change(function () {
            exports.saveDigitalSignatureChecked();
        });
        $(".js-surrender-checks-ecms").change(function() {
            exports.saveEcmsChecked();
        });
    };

    exports.postCheckbox = function(name, value) {

        var data = {};
        data[name] = value;
        $.ajax({
            type: "POST",
            url: "surrender-checks",
            data: data,
            success: window.location.reload(true)
        });
    };


    exports.saveDigitalSignatureChecked = function () {
        if ($(".js-surrender-checks-digitalSignature").prop("checked")) {
            this.postCheckbox("signatureChecked",1);
        } else {
            this.postCheckbox("signatureChecked",0);
        }
    };

    exports.saveEcmsChecked = function () {
        if ($(".js-surrender-checks-ecms").prop("checked")) {
           this.postCheckbox("ecmsChecked",1);
        } else {
            this.postCheckbox("ecmsChecked",0);
        }
    };

    return exports;
}(document, window.jQuery));
