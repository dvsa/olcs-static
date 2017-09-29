var OLCS = OLCS || {};

OLCS.generateCSSSelector = (function (document, $, undefined) {

  "use strict";
   
  return function generateSelector(node) {

    var path;
    while (node.length) {
      var realNode = node[0],
        name = realNode.localName;
      if (!name) {
        break;
      }
      name = name.toLowerCase();

      var parent = node.parent();

      var sameTagSiblings = parent.children(name);
      if (sameTagSiblings.length > 1) {
        var allSiblings = parent.children();
        var index = allSiblings.index(realNode) + 1;
        if (index > 0) {
          name += ":nth-child(" + index + ")";
        }
      }

      path = name + (path ? ">" + path : "");
      node = parent;
    }

    return path;

  };

}(document, window.jQuery));