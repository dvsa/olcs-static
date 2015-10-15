(function() {
    
    "use strict";

    module.exports = function(grunt) {
      
    var pubStyles, scriptPaths, scripts, srcAssets, styles, prototypeName, globalConfig;

    srcAssets = 'assets/_styles';
    pubStyles = 'public/styles';

    styles = {
      'public/styles/selfserve.css': 'assets/_styles/themes/selfserve.scss',
      'public/styles/internal.css': 'assets/_styles/themes/internal.scss'
    };

    globalConfig = {};

    scriptPaths = function(path) {
      var paths;
      return paths = [
        "assets/_js/common/vendor/jquery.1.11.0.js",
        "assets/_js/common/vendor/chosen.jquery.min.js",
        "assets/_js/common/*.js",
        "assets/_js/" + path + "/*.js",
        "assets/_js/init/common.js",
        "assets/_js/init/" + path + ".js"
      ];
    };

    scripts = {
      "public/js/internal.js": scriptPaths("internal"),
      "public/js/selfserve.js": scriptPaths("selfserve")
    };

    grunt.initConfig({
        
      globalConfig: globalConfig,
      
      sass: {
        dev: {
          options: {
            style: 'expanded',
            sourcemap: true
          },
          files: styles
        },
        prod: {
          options: {
            style: 'compressed',
            sourcemap: false
          },
          files: styles
        }
      },
      
     copy: {
        prototype: {
          files: [{
            expand: true,
            cwd: 'public/styleguides/selfserve/<%= globalConfig.prototypeName %>/',
            src: ['**/*.html'],
            dest: '../prototypes/<%= globalConfig.prototypeName %>/'
          }, {
            expand: true,
            cwd: 'public/js/',
            src: ['selfserve.js','<%= globalConfig.prototypeName %>.js'],
            dest: '../prototypes/<%= globalConfig.prototypeName %>/js/'
          }, {
            expand: true,
            cwd: 'public/styles/',
            src: ['selfserve.css'],
            dest: '../prototypes/<%= globalConfig.prototypeName %>/styles/'
          }, {
            expand: true,
            cwd: 'public/images/',
            src: ['**/*.png', '**/*.gif'],
            dest: '../prototypes/<%= globalConfig.prototypeName %>/images/'
          }]
        }
      },
      
      clean: {
        styleguide: {
          src: 'public/styleguides/**/*.html'
        },
        prototype: {
          options: {
            force: true
          },
          src: ['../prototypes/<%= globalConfig.prototypeName %>/**/*.html',
                '../prototypes/<%= globalConfig.prototypeName %>/**/*.css',
                '../prototypes/<%= globalConfig.prototypeName %>/**/*.js',
                '../prototypes/<%= globalConfig.prototypeName %>/**/*.png'
          ]
        }
      },
      
      notify: {
        options: {
          sucess: false
        }
      },
      
      assemble: {
        options: {
          helpers: ['handlebars-helper-repeat']
        },
        internal: {
          options: {
            layout: 'base.hbs',
            layoutdir: 'styleguides/layouts/internal/',
            partials: 'styleguides/partials/*.hbs'
          },
          cwd: 'styleguides/pages/internal',
          dest: 'public/styleguides/internal',
          expand: true,
          src: '**/*.hbs'
        },
        selfserve: {
          options: {
            layout: 'base.hbs',
            layoutdir: 'styleguides/layouts/selfserve/',
            partials: 'styleguides/partials/*.hbs'
          },
          cwd: 'styleguides/pages/selfserve',
          dest: 'public/styleguides/selfserve',
          expand: true,
          src: '**/*.hbs'
        }
      },
      
      watch: {
        options: {
          livereload: true,
          spawn: false
        },
        styles: {
          files: ['assets/_styles/**/*.scss'],
          tasks: ['sass:dev']
        },
        hbs: {
          files: ['styleguides/**/*.hbs'],
          tasks: ['assemble']
        },
        scripts: {
          files: ['assets/_js/**/*.js'],
          tasks: ['uglify:dev']
        }
      },
      
      browserSync: {
        bsFiles: {
          src: ['public/**/*.css', 'public/**/*.html']
        },
        options: {
          port: 7001,
          open: false,
          notify: false,
          ghostMode: {
            clicks: true,
            scroll: true,
            links: true,
            forms: true
          },
          watchTask: true,
          server: {
            baseDir: './public'
          }
        }
      },
      
      uglify: {
        dev: {
          options: {
            sourceMap: true
          },
          files: scripts
        },
        prod: {
          options: {
            sourceMap: false,
            compress: {
              pure_funcs: ["OLCS.logger"]
            }
          },
          files: scripts
        }
      },
      
      jshint: {
        options: {
          jshintrc: ".jshintrc"
        },
        "static": ["assets/_js/**/*.js", "!assets/_js/**/vendor/*"],
        apps: ["../olcs-common/Common/src/Common/assets/js/inline/**/*.js", "../olcs-internal/module/*/assets/js/inline/**/*.js", "../olcs-selfserve/module/*/assets/js/inline/**/*.js"]
      },
      
      karma: {
        options: {
          browsers: ["PhantomJS"],
          configFile: "karma.conf.js",
          singleRun: true
        },
        test: {
          reporters: ["mocha", "coverage", "junit"]
        },
        ci: {
          colors: false
        }
      },
      
        scsslint: {
            allFiles: [
                'assets/styles/**/*.scss',
            ],
            options: {}
        }
        
    }); // initConfig
    
    if (grunt.option("production")) {
      grunt.loadNpmTasks("grunt-sass");
      grunt.loadNpmTasks("grunt-contrib-uglify");
    } else {
      require('matchdep').filterAll(['grunt-*', 'assemble']).forEach(grunt.loadNpmTasks);
    }

    grunt.registerTask('compile:dev', ['lint', 'sass:dev', 'uglify:dev', 'assemble']);
    grunt.registerTask('compile:staging', ['lint', 'sass:prod', 'uglify:prod', 'assemble']);
    grunt.registerTask('compile:live', ['sass:prod', 'uglify:prod']);
    
    // Sass/Scss linting
    grunt.loadNpmTasks('grunt-scss-lint');
    grunt.registerTask('default', ['scsslint']);

    grunt.registerTask('serve', ['notify', 'compile:dev', 'browserSync', 'watch']);

    grunt.registerTask('test', ['karma:test']);
    grunt.registerTask('test:ci', ['karma:ci']);

    grunt.registerTask('lint', ['jshint:static']);


    /* Prototype tasks */
    grunt.registerTask('tm-prototype', function(directory) {
      globalConfig.prototypeName = 'tm-prototype';
      grunt.task.run(['clean:prototype', 'copy:prototype']);
    });

    grunt.registerTask('authentication-prototype', function(directory) {
      globalConfig.prototypeName = 'authentication-prototype';
      grunt.task.run(['clean:prototype', 'copy:prototype']);
    });

    grunt.registerTask('submit-app-prototype', function(directory) {
      globalConfig.prototypeName = 'submit-app-prototype';
      grunt.task.run(['clean:prototype', 'copy:prototype']);
    });

    grunt.registerTask('search-prototype', function(directory) {
      globalConfig.prototypeName = 'search-prototype';
      grunt.task.run(['clean:prototype', 'copy:prototype']);
    });


    /*
     * Define a single Jenkins build task here for any relevant environments
     *
     * Generally these will be simple wrappers around other tasks. The main
     * point is that we only ever want jenkins to have to run *one* Grunt task
     * so we don't have to update each job's configuration just to build some
     * new stuff; instead we just add it to this task and we're done
     */
    grunt.registerTask('build:staging', ['test:ci', 'compile:staging']);
    grunt.registerTask('build:demo', ['test:ci', 'compile:live']);
    grunt.registerTask('build:live', ['compile:live']);
  };

}).call(this);
