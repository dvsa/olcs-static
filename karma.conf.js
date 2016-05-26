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
      
      // test helpers
      "node_modules/sinon/lib/sinon.js",
      "node_modules/sinon/lib/sinon/spy.js",
      "node_modules/sinon/lib/sinon/**/*.js",

      // common dependencies, jQuery always first
      "assets/_js/common/vendor/jquery.1.11.0.js",
      "assets/_js/common/vendor/**/*.js",

      // source files...
      "assets/_js/common/*.js",
      "test/js/setup.js",

      // test files
      "test/js/**/*.test.js"
      
    ],
    
    exclude: [],
    
    preprocessors: {
      "assets/_js/common/*.js": ["coverage"],
      "assets/_js/internal/*.js": ["coverage"],
      "assets/_js/selfserve/*.js": ["coverage"]
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