module.exports = function(config) {
  
  /**
   * Karma.Configuration
   *
   * Configuration file for the Karma test runner, imported by
   * Gruntifle.js and used by Grunt-Karma
   */

  "use strict";

  config.set({
    
    frameworks: ["mocha", "expect"],
    
    // These files are re-defined in Gruntfile.js
    files: [
      "node_modules/sinon/lib/sinon.js",
      "node_modules/sinon/lib/sinon/spy.js",
      "node_modules/sinon/lib/sinon/**/*.js",
      "assets/_js/vendor/jquery.1.11.0.js",
      "assets/_js/vendor/**/*.js",
      "assets/_js/components/*.js",
      "test/js/setup.js",
      "test/js/**/*.test.js"
    ],
    
    exclude: [],
    
    preprocessors: {
      "assets/_js/components/*.js": ["coverage"]
    },
    
    reporters: ["dots", "coverage", "junit"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    captureTimeout: 60000,

    coverageReporter: {
      dir: "public/unit-testing",
      subdir: '.',
      reporters: [
        {type: "html"},
        {type: "lcov"},
        {type: "cobertura"}
      ]
    },

    junitReporter: {
      outputFile: "test/js/reports/results.xml"
    }
    
  });
  
};