$(function() {
  "use strict";

  // always append a hidden element to all forms so we know they were submitted
  // with a JS enabled browser. The backend can then optionally look for this
  // known value and potentially react accordingly
  //
  // we don't really like having initialisation logic in common but this is so
  // minor anything else would feel a bit overblown. Can refactor if needed.
  $("form").append("<input type='hidden' name='js-submit' value='1' />");
});
