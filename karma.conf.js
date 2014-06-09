module.exports = function(config) {

  config.set({
    frameworks: ["mocha", "expect"],
    files: [
      // test helpers
      "node_modules/sinon/lib/sinon.js",
      "node_modules/sinon/lib/sinon/spy.js",
      "node_modules/sinon/lib/sinon/**/*.js",

      // common dependencies
      "../olcs-common/Common/assets/js/vendor/**/*.js",

      // source files...
      "../olcs-common/Common/assets/js/src/**/*.js",
      "../olcs-selfserve/module/SelfServe/assets/js/src/**/*.js",
      "../olcs-internal/module/Olcs/assets/js/src/**/*.js",

      // test files
      "../olcs-common/test/js/**/*.test.js",
      "../olcs-selfserve/test/js/**/*.test.js",
      "../olcs-internal/test/js/**/*.test.js"
    ],
    exclude: [],
    preprocessors: {
      "../olcs-common/Common/assets/js/src/**/*.js": ["coverage"],
      "../olcs-selfserve/module/SelfServe/assets/js/src/**/*.js": ["coverage"],
      "../olcs-internal/module/Olcs/assets/js/src/**/*.js": ["coverage"]
    },
    reporters: ["mocha", "coverage", "junit"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    captureTimeout: 60000,

    coverageReporter: {
      type: "lcov",
      dir: "test/js/coverage"
    },

    junitReporter: {
      outputFile: "test/js/reports/results.xml"
    }
  });
};
