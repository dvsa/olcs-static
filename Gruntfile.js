(function() {

  /**
   * Gruntfile.js
   *
   * OLCS automated front-end build processes to setup the
   * OLCS-Static repo using the Grunt build tool. Ensure to
   * read documentation on the Wiki @ https://wiki.i-env.net/
   */

  "use strict";

  module.exports = function(grunt) {

    /**
     * Global Configuration
     *
     * General reusable variables and functions for use with
     * all Grunt tasks. You can pass any desired global config
     * to the 'globalConfig' variable.
     */

    // Set any global grunt configuration
    var globalConfig = {};

    // Setup param to access via command line
    var target = grunt.option('target');

    // Set the location for the public images directory
    var pubImages = 'public/images';

    // Define the theme stylesheets
    var styles = {
      'public/styles/print.css'     : 'assets/_styles/themes/print.scss',
      'public/styles/selfserve.css' : 'assets/_styles/themes/selfserve.scss',
      'public/styles/internal.css'  : 'assets/_styles/themes/internal.scss'
    };

    // Function to get all scripts for use with a given theme
    var scriptPaths = function(path) {
      var paths;
      return paths = [
        "assets/_js/vendor/jquery.1.11.0.js",
        //"assets/_js/vendor/select2.full.min.js",
        "assets/_js/vendor/chosen.jquery.min.js",
        "assets/_js/vendor/jquery.details.min.js",
        "assets/_js/components/*.js",
        "assets/_js/" + path + "/*.js",
        "assets/_js/init/common.js",
        "assets/_js/init/" + path + ".js"
      ];
    };

    // Define the main JS files for each theme, using the above function
    var scripts = {
      "public/js/internal.js"  : [
        scriptPaths("internal"), "assets/_js/vendor/pace.min.js"
      ],
      "public/js/selfserve.js" : scriptPaths("selfserve")
    };

    // Function to get which file(s) should be used to run JS tests
    var testFiles = function(path) {
      var paths;
      return paths = [
        "node_modules/sinon/lib/sinon.js",
        "node_modules/sinon/lib/sinon/spy.js",
        "node_modules/sinon/lib/sinon/**/*.js",
        "assets/_js/vendor/jquery.1.11.0.js",
        "assets/_js/vendor/**/*.js",
        "assets/_js/components/*.js",
        "test/js/setup.js",
        "test/js/**/" + path +  ".test.js"
      ];
    }

    /**
     * Grunt Tasks
     *
     * List of all separate Grunt tasks used by OLCS-Static,
     * including a link to the public repo and minimum required
     * version number.
     */

    grunt.initConfig({

      // Set any global configuration
      globalConfig: globalConfig,

      /**
       * Sass
       * https://github.com/sindresorhus/grunt-sass
       */

      sass: {
        dev: {
          options: {
            outputStyle: 'expanded',
            sourceMap: true
          },
          files: styles
        },
        prod: {
          options: {
            outputStyle: 'compressed',
            sourceMap: false
          },
          files: styles
        }
      },

      /**
       * Post CSS
       * https://github.com/nDmitry/grunt-postcss
       */

      postcss: {
        options: {
          processors: [
            require('autoprefixer')({
              browsers: ['last 2 versions', 'ie >= 8']
            })
          ]
        },
        internal: {
          options: {
            map: {
              inline: false,
              prev: 'public/styles/internal.css.map',
            }
          },
          build: {
            src: 'public/styles/internal.css'
          }
        },
        selfserve: {
          options: {
            map: {
              inline: false,
              prev: 'public/styles/selfserve.css.map',
            }
          },
          build: {
            src: 'public/styles/selfserve.css'
          }
        }
      },

      /**
       * Copy
       * https://github.com/gruntjs/grunt-contrib-copy
       */

      copy: {
        prototype: {
          files: [
            {
              expand: true,
              cwd: 'public/styleguides/selfserve/'+target+'/',
              src: ['**/*.html'],
              dest: '../prototypes/'+target+'/'
            }, {
              expand: true,
              cwd: 'public/js/',
              src: ['selfserve.js',target+'.js'],
              dest: '../prototypes/'+target+'/js/'
            }, {
              expand: true,
              cwd: 'public/styles/',
              src: ['selfserve.css'],
              dest: '../prototypes/'+target+'/styles/'
            }, {
              expand: true,
              cwd: 'public/images/',
              src: ['**/*.{png,jpg,gif,svg}'],
              dest: '../prototypes/'+target+'/images/'
            }, {
              expand: true,
              cwd: 'public/fonts/',
              src: ['**/*'],
              dest: '../prototypes/'+target+'/fonts/'
            }
          ]
        },
        images: {
          files: [{
            expand: true,
            cwd: 'assets/_images/',
            src: ['**/*.{png,jpg,gif,svg}'],
            dest:'public/images/'
          }]
        }
      },

      /**
       * Clean
       * https://github.com/gruntjs/grunt-contrib-clean
       */

      clean: {
        styleguide: {
          src: 'public/styleguides/**/*.html'
        },
        prototype: {
          options: {
            force: true
          },
          src: [
            '../prototypes/<%= globalConfig.prototypeName %>/**/*.html',
            '../prototypes/<%= globalConfig.prototypeName %>/**/*.css',
            '../prototypes/<%= globalConfig.prototypeName %>/**/*.js',
            '../prototypes/<%= globalConfig.prototypeName %>/**/*.png'
          ]
        },
        images: {
          src: pubImages
        }
      },

      /**
       * grunt-svg2png
       * https://github.com/dbushell/grunt-svg2png
       */

      svg2png: {
        all: {
          files: [{
            flatten: true,
            cwd: 'assets/_images/svg/',
            src: '*.svg',
            dest: pubImages + '/bitmap'
          }]
        }
      },

      /**
       * grunt-dr-svg-sprites
       * https://github.com/drdk/grunt-dr-svg-sprites
       */

      "dr-svg-sprites": {
        application: {
          options: {
            previewPath: 'public/styleguides',
            spriteElementPath: 'assets/_images/svg',
            spritePath: pubImages + '/svg/icon-sprite.svg',
            cssPath: 'assets/_styles/core/icon-sprite.scss',
            layout: 'vertical',
            cssSuffix: 'scss',
            unit: 50
          }
        }
      },

      /**
       * Assemble
       * https://github.com/assemble/grunt-assemble
       */

      assemble: {
        options: {
          helpers: [
            'handlebars-helper-repeat', 
            'handlebars-helper-asset'
          ],
          assets: 'public'
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

      /**
       * Browser Sync
       * https://github.com/BrowserSync/grunt-browser-sync
       */

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

      /**
       * Uglify
       * https://github.com/gruntjs/grunt-contrib-uglify
       */

      uglify: {
        dev: {
          options: {
            sourceMap: true,
            mangle: false,
            compress: false,
            beautify: true
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

      /**
       * JSHint
       * https://github.com/gruntjs/grunt-contrib-jshint
       */

      jshint: {
        options: {
          jshintrc: ".jshintrc"
        },
        "static": ["assets/_js/**/*.js", "!assets/_js/**/vendor/*"],
        apps: [
          "../olcs-common/Common/src/Common/assets/js/inline/**/*.js",
          "../olcs-internal/module/*/assets/js/inline/**/*.js",
          "../olcs-selfserve/module/*/assets/js/inline/**/*.js"
        ]
      },

      /**
       * SCSS-Lint
       * https://github.com/brigade/scss-lint
       */

      scsslint: {
        allFiles: [
          'assets/_styles/**/*.scss',
          '!assets/_styles/vendor/**/*'
        ],
        options: {}
      },

      /**
       * Notify
       * https://github.com/dylang/grunt-notify
       */

      notify: {
        options: {
          sucess: false
        }
      },

      /**
       * Watch
       * https://github.com/gruntjs/grunt-contrib-watch
       */

      watch: {
        options: {
          livereload: true,
          spawn: false
        },
        styles: {
          files: ['assets/_styles/**/*.scss'],
          tasks: ['sass:dev', 'postcss']
        },
        hbs: {
          files: ['styleguides/**/*.hbs'],
          tasks: ['clean:styleguide', 'assemble']
        },
        scripts: {
          files: ['assets/_js/**/*.js'],
          tasks: ['uglify:dev']
        },
        images: {
          files: ['assets/_images/**/*.{png,jpg,gif,svg}'],
          tasks: ['copy:images', 'svg2png', 'dr-svg-sprites']
        }
      },

      /**
       * Karma
       * https://github.com/karma-runner/grunt-karma
       */

      karma: {
        options: {
          browsers: ["PhantomJS"],
          configFile: "karma.conf.js",
          singleRun: true,
          files: testFiles("*"),
          reporters: ["mocha", "coverage", "junit"]
        },
        test: {
          reporters: ["mocha", "coverage", "junit"]
        },
        ci: {
          colors: false
        },
        single: {
          options: {
            files: testFiles(target)
          }
        },
      },

      /**
       * grunt-localscreenshots
       * https://github.com/danielhusar/grunt-localscreenshots
       *
       * @NOTE: You'll need PhantomJs installed locally to get
       * this task to work
       */

      localscreenshots: {
        options: {
          path: 'styleguides/screenshots',
          type: 'png',
          local : {
            path: 'public',
            port: 3000
          },
          viewport: [
            '600x800', '768x1024', '1200x1024'
          ],
        },
        src: ['public/styleguides/**/*.html']
      },

      /**
       * Github Pages
       * https://github.com/tschaub/grunt-gh-pages
       */
        
      'gh-pages': {
        options: {
          repo: 'https://github.com/OLCS/olcs-static.git',
          message: 'automatic merge commit'
        },
        'gh-pages': {
          options: {
            base: 'public',
            //add: true
          },
          src: ['**', '!index.html', '!unit-testing']
        }
      }

    }); // initConfig

    /**
     * Load NPM Tasks
     *
     * This uses 'matchdep' to get all available grunt tasks and
     * loads them automatically.
     */

    require('matchdep').filterAll([
      'grunt-*', '!grunt-cli', 'assemble'
    ]).forEach(grunt.loadNpmTasks);

    /**
     * Register Compilation Environments
     *
     * The below tasks are for compiling the app for various
     * scenarios and environments.
     */

    grunt.registerTask('default', [
      'serve'
    ]);

    grunt.registerTask('compile:dev', [
      'clean:images',
      'svg2png',
      'dr-svg-sprites',
      'sass:dev',
      'postcss',
      'uglify:dev',
      'copy:images',
      'assemble'
    ]);

    grunt.registerTask('compile:staging', [
      'lint',
      'sass:prod',
      'postcss',
      'uglify:prod'
    ]);

    grunt.registerTask('compile:live', [
      'sass:prod',
      'postcss',
      'uglify:prod'
    ]);

    /**
     * Register General Tasks
     *
     * Register tasks for compiling, serving and testing code
     */

    // JS/SCSS Linting
    grunt.registerTask('lint', [
      'jshint:static',
      //'scsslint'
    ]);

    // Browser Sync
    grunt.registerTask('serve', [
      'notify',
      'compile:dev',
      'browserSync',
      'watch'
    ]);

    // Karma
    grunt.registerTask('test', [
      'karma:test'
    ]);

    grunt.registerTask('test:ci', ['karma:ci']);

    // To run an idividual component spec use:
    // $ grunt test:single --target=componentName
    grunt.registerTask('test:single', [
      'karma:single:' + target
    ]);

    /**
     * Prototype
     * To create/update an individual prototype use:
     * $ grunt prototype --target=prototypeName
     */
    grunt.registerTask('prototype', [
      'clean:prototype:'+ target,
      'copy:prototype:'+ target
    ]);

    /**
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