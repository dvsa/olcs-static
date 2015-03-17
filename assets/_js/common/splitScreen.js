var OLCS = OLCS || {};

/**
 * OLCS.splitScreen
 *
 * Handles the splitScreen js
 */

OLCS.splitScreen = (function(document, $, undefined) {

  'use strict';

  return function init() {

    var isClosed = false;
    var isPreloading;

    var fragment = window.location.hash.substring(1);
    var decoded = window.atob(fragment);
    var parts = decoded.split('|');

    var url1 = parts[0];
    var url2 = parts[1];
    var orientation = parts[2];

    var mainFrame = $('#iframe-one');
    var sideFrame = $('#iframe-two');
    var panel = $('#iframe-panel');

    var canStore;

    try {
      localStorage.setItem('checkStore', true);
      canStore = true;
    } catch (err) {
      canStore = false;
    }

    function getDefaultOrientation() {
      // If we have a valid orientation in the hash, use that
      if ($.inArray(orientation, ['vertical', 'horizontal']) !== -1) {
        return orientation;
      }

      // See if we can check the localStorage
      var defaultOrientation = getOrientationPreference();

      // If we still don't have a valid orientation, set to default
      if ($.inArray(defaultOrientation, ['vertical', 'horizontal']) === -1) {
        defaultOrientation = 'horizontal';
      }

      return defaultOrientation;
    }

    function getOrientationPreference() {
      if (canStore) {
        return localStorage.getItem('OLCS.preferences.splitscreen.orientation');
      }
    }

    function setOrientationPreference(orientation) {
      if (canStore) {
        localStorage.setItem('OLCS.preferences.splitscreen.orientation', orientation);
      }
    }

    function close() {
      orientation = 'closed';
      updateHash();
      mainFrame.attr('class', 'iframe iframe-full');
      sideFrame.remove();
      panel.remove();
      isClosed = true;
    }

    function updateHash() {
      var string = url1 + '|' + url2 + '|' + orientation;
      window.location.hash = '#' + window.btoa(string);
    }

    function setOrientation(newOrientation) {
      orientation = newOrientation;

      setOrientationPreference(orientation);

      mainFrame.attr('class', 'iframe iframe-' + orientation);
      sideFrame.attr('class', 'iframe iframe-' + orientation);
      panel.attr('class', 'iframe-panel-' + orientation);

      updateHash();
    }

    if (orientation === 'closed') {
      close();
    } else {

      isPreloading = true;
      OLCS.preloader.show();

      setOrientation(getDefaultOrientation());
    }

    mainFrame.attr('src', url1);
    sideFrame.attr('src', url2);

    // Need a better solution for this
    mainFrame.load(function() {

      url1 = window.frames['iframe-one'].location.href;

      updateHash();

      if (isClosed) {
        $('body').html(mainFrame.contents().find('body').html());

        $('body').find('form').each(function () {
          if (!$(this).attr('action') || $(this).attr('action') === '') {
            $(this).attr('action', url1);
          }
        });
      }

      // Need to only hide this the first time
      if (isPreloading) {
        OLCS.preloader.hide();
        isPreloading = false;
      }
    });

    $(document).on('click', '#toggle-orientation', function toggleOrientation() {
      setOrientation(orientation === 'vertical' ? 'horizontal' : 'vertical');
    });

    $(document).on('click', '#side-panel-close', close);
  };

}(document, window.jQuery));
