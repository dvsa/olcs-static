var OLCS = OLCS || {};


OLCS.surrenderDetails = (function(document, $) {
    "use strict";

    var exports = {};

    exports.init = function () {
        $(".js-surrender-checks-digitalSignature").change(function () {
            exports.toggleSurrender();
        });
        $(".js-surrender-checks-ecms").change(function () {
            exports.toggleSurrender();
        });
    };

    exports.shouldEnableButton = function () {
        return exports.hasNoOpenCases() && exports.hasNoBusRegistrations() &&
            exports.hasCheckedSignature() && exports.hasCheckedECMS();
    };

    exports.hasCheckedSignature = function () {
        return $(".js-surrender-checks-digitalSignature").prop("checked");
    };

    exports.hasCheckedECMS = function () {
        return $(".js-surrender-checks-ecms").prop("checked");
    };

    exports.hasNoOpenCases = function () {
        return $(".js-surrender-checks-openCases").length > 0;
    };

    exports.hasNoBusRegistrations = function () {
        if ( $(".js-surrender-checks-busRegistrations").length > 0) {
            return true;
        }

        return $("table[name=busRegistrations]").length < 1;
    };

    exports.toggleSurrender = function () {
        if (exports.shouldEnableButton()) {
            exports.enableSurrender();
        } else {
            exports.disableSurrender();
        }
    };

    exports.enableSurrender = function () {
        $(".js-approve-surrender").removeClass("disabled");
    };

    exports.disableSurrender = function () {
        var button = $(".js-approve-surrender");
        if (!button.hasClass("disabled")) {
            button.addClass("disabled");
        }
    };

    return exports;

}(document, window.jQuery));
