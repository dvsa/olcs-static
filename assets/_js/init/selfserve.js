OLCS.ready(function() {
  
  "use strict";

  OLCS.toggleElement({
    triggerSelector: ".proposition__toggle",
    targetSelector: ".proposition-nav"
  });
  
  OLCS.tooltip({
    parent: ".tooltip-parent"
  });
  
  OLCS.skipLink({
    trigger: "#skipToContent",
    target: "#main"
  });
  
  OLCS.formErrors({
    container: "#validationSummary"
  });

});
