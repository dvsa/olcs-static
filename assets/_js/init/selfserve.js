var exports = window.module || {};

OLCS.ready(function() {

  "use strict";

  OLCS.toggleElement({
    triggerSelector: ".proposition__toggle",
    targetSelector: ".proposition-nav"
  });

  OLCS.tooltip({
    parent: ".tooltip-parent"
  });

  OLCS.accessibility();

  OLCS.searchFilter();

  OLCS.singleActivePermitsRequiredTextbox();

  window.GOVUKFrontend.initAll();

  window.cookieManager.init(window.cookieConfig);
});
