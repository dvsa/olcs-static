var OLCS = OLCS || {};

/**
 * OLCS.splitScreen
 *
 * Handles the splitScreen js
 */

OLCS.splitScreen = (function(document, $, undefined) {

  'use strict';

  return function init() {

    var url1, url2, orientation, isVisible, mainFrame, sideFrame, panel, canStore;

    /**
     * Splits the hash fragment into the relevant variables, format is
     *  #base64encode(url1|url2|orientation|isVisible)
     */
    function splitHashFragment() {
      var parts = window.atob(window.location.hash.substring(1)).split('|');

      url1 = parts[0];
      url2 = parts[1];
      orientation = parts[2];
      isVisible = parts[3] === '0' ? false : true;
    }

    /**
     * Finds the panel and the iframe dom elements
     */
    function findComponents() {
      mainFrame = $('#iframe-one');
      sideFrame = $('#iframe-two');
      panel = $('.iframe-controls');
    }

    /**
     * Checks whether we can access local storage for preferences
     */
    function checkStore() {
      try {
        localStorage.setItem('checkStore', true);
        canStore = true;
      } catch (err) {
        canStore = false;
      }
    }

    function isValidOrientation(orientation) {
      return $.inArray(orientation, ['vertical', 'horizontal', 'closed']) !== -1;
    }

    /**
     * Grabs the default orientation,
     *  - checks the hash fragment first
     *  - then checks local storage preferences
     */
    function getDefaultOrientation() {

      if (isValidOrientation(orientation)) {
        return orientation;
      }

      var defaultOrientation = getOrientationPreference();

      if (!isValidOrientation(defaultOrientation)) {
        defaultOrientation = 'horizontal';
      }

      return defaultOrientation;
    }

    /**
     * Grab the orientation preference from local storage if we can
     */
    function getOrientationPreference() {
      if (canStore) {
        return localStorage.getItem('OLCS.preferences.splitscreen.orientation');
      }
    }

    /**
     * Save our current orientation to the preferences local storage if we can
     *
     * @param {string} orientation
     */
    function setOrientationPreference(orientation) {
      if (canStore) {
        localStorage.setItem('OLCS.preferences.splitscreen.orientation', orientation);
      }
    }

    /**
     * Called when the close button is clicked
     */
    function close() {
      // We need to update the hash to remember that we are closed
      //  in case someone refreshes the page
      orientation = 'closed';
      updateHashFragment();

      // Resize the iframe
      mainFrame.attr('class', 'iframe--full');

      // We no longer care about the side frame or panel so we can remove them
      sideFrame.remove();
      panel.remove();

      mainFrame.contents().find('form,a').each(function () {
        if (!$(this).attr('target')) {
          $(this).attr('target', '_parent');
        }
      });
    }

    /**
     * Update the has fragment in the url
     */
    function updateHashFragment() {
      var string = url1 + '|' + url2 + '|' + orientation + '|' + (isVisible ? '1' : '0');
      window.location.hash = '#' + window.btoa(string);
    }

    /**
     * Set the orientation of the split screen
     *
     * @param {string} newOrientation
     */
    function setOrientation(newOrientation) {
      orientation = newOrientation;

      setOrientationPreference(orientation);

      mainFrame.attr('class', 'iframe--' + orientation);
      sideFrame.attr('class', 'iframe--' + orientation);
      panel.attr('class', 'iframe-controls ' + orientation);

      updateHashFragment();
    }

    /**
     * Called when we toggle collapsing the split screen
     */
    function toggleVisible() {
      isVisible = !isVisible;
      updateHashFragment();
      panel.toggleClass('collapsed');
      $('#iframe-two').toggleClass('collapsed');
      $('#iframe-one.iframe--horizontal').toggleClass('full');
    }

    splitHashFragment();

    findComponents();

    // Start loading the iframes
    mainFrame.attr('src', url1);
    sideFrame.attr('src', url2);

    checkStore();

    if (orientation === 'closed') {
      // In this case, we have to wait for the mainFrame to load before calling close, otherwise it won't
      //  set target parent on anything
      mainFrame.load(function() {
        close();
      });
    } else {
      setOrientation(getDefaultOrientation());
    }

    if (!isVisible) {
      toggleVisible();
    }

    // Listeners
    $(document).on('click', '.iframe-controls--orientation', function toggledOrientation(e) {
      e.preventDefault();
      setOrientation(orientation === 'vertical' ? 'horizontal' : 'vertical');
    });

    $(document).on('click', '.iframe-controls--toggle', function toggledVisibility(e) {
      e.preventDefault();
      toggleVisible();
    });

    $(document).on('click', '.iframe-controls--close', function closeSplitScreen(e) {
      e.preventDefault();
      close();
    });
  };
}(document, window.jQuery));
