module.exports = function(grunt) {
  var sourcePaths = [
    "../olcs-common/Common/assets/js/src/**/*.js",
    "../olcs-selfserve/module/SelfServe/assets/js/src/**/*.js",
    "../olcs-internal/module/Olcs/assets/js/src/**/*.js"
  ];

  grunt.initConfig({
    uglify: {
      options: {
        sourceMap: true
      },
      build: {
        files: {
          "public/static/js/common.js": [
            "../olcs-common/Common/assets/js/vendor/**/*.js",
            "../olcs-common/Common/assets/js/src/**/*.js"
          ],
          "public/static/js/selfserve.js": [
            "../olcs-selfserve/module/SelfServe/assets/js/src/**/*.js"
          ],
          "public/static/js/internal.js": [
            "../olcs-internal/module/Olcs/assets/js/src/**/*.js"
          ]
        }
      }
    },

    jshint: {
      options: {
        jshintrc: "../olcs-common/.jshintrc"
      },
      all: sourcePaths
    },

    karma: {
      unit: {
        configFile: "karma.conf.js",
        singleRun: true,
        browsers: ["PhantomJS"]
      }
    },
    sass: {
      dist: {
        options: {
          style: "expanded",
        },
        files: {
          "public/static/stylesheets/main.css": "../olcs-common/Common/assets/scss/src/main.scss"
        }
      }
    },

    watch: {
      options: {
          livereload: true
      },
      scripts: {
        files: sourcePaths,
        tasks: ["uglify:build"]
      },
      styles: {
        files: ["../olcs-common/Common/assets/scss/**/*.scss"],
        tasks: ["sass:dist"]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-karma");

  grunt.registerTask("default", ["jshint", "karma", "build"]);

  grunt.registerTask("build", "uglify:build");
};
