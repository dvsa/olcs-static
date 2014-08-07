module.exports = function(config) {

  config.set({
    frameworks: ["mocha", "expect"],
    files: [
      // test helpers
      "node_modules/sinon/lib/sinon.js",
      "node_modules/sinon/lib/sinon/spy.js",
      "node_modules/sinon/lib/sinon/**/*.js",

      // common dependencies
      "assets/_js/common/vendor/**/*.js",

      // source files...
      "assets/_js/common/*.js",
      "assets/_js/internal/*.js",
      // "assets/_js/selfserve/*.js", <-- none yet, triggers a warning

      // test files
      "test/js/**/*.test.js"
    ],
    exclude: [],
    preprocessors: {
      "assets/_js/common/*.js": ["coverage"],
      "assets/_js/internal/*.js": ["coverage"],
      "assets/_js/selfserve/*.js": ["coverage"]
    },
    //reporters: ["mocha", "coverage", "junit"],
    port: 9876,
    //colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    captureTimeout: 60000,

    coverageReporter: {
      type: "cobertura",
      dir: "test/js/coverage-xml"
    },

    junitReporter: {
      outputFile: "test/js/reports/results.xml"
    }
  });
};
