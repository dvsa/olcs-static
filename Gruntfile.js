(function() {

    /**
     * Gruntfile.js
     *
     * OLCS automated front-end build processes to setup the
     * OLCS-Static repo using the Grunt build tool. Ensure to
     * read documentation on the Wiki @ https://wiki.i-env.net/
     */

    'use strict';

    module.exports = function(grunt) {


        var path = require('path');
        /**
         * Global Configuration
         *
         * General reusable variables and functions for use with
         * all Grunt tasks. You can pass any desired global config
         * to the 'globalConfig' variable.
         */

        // Set any global grunt configuration
        var globalConfig = {};

        // Set development environment to determine asset minification
        var env = grunt.option('env') || 'dev';

        // Setup param to access via command line
        var target = grunt.option('target');

        // Set the location for the public images directory
        var pubImages = 'public/images';

        // Function to get all scripts for use with a given theme
        var scriptPaths = function(theme) {
            var files = [
                'assets/_js/vendor/jquery.1.11.0.js',
                'assets/_js/vendor/chosen.jquery.min.js',
                'assets/_js/vendor/jquery.details.min.js',
                'assets/_js/components/*.js',
                'assets/_js/' + theme + '/*.js',
                'assets/_js/init/common.js',
                'assets/_js/init/' + theme + '.js'
            ];
            if (theme == 'internal') {
                files.push(
                    'assets/_js/vendor/pace.min.js'
                );
            };
            return files;
        };

        // Function to get which file(s) should be used to run JS tests
        var testFiles = function(theme) {
            var files = [
                'node_modules/sinon/lib/sinon.js',
                'node_modules/sinon/lib/sinon/spy.js',
                'node_modules/sinon/lib/sinon/**/*.js',
                'assets/_js/vendor/jquery.1.11.0.js',
                'assets/_js/vendor/**/*.js',
                'assets/_js/components/**/*.js',
                'assets/_js/internal/**/*.js',
                'test/js/setup.js',
                'test/js/**/' + theme + '.test.js',
                'public/tinymce/jquery.tinymce.min.js'
            ];
            return files;
        }

        // Define the theme stylesheets
        var styles = {
            'public/styles/print.css': 'assets/_styles/themes/print.scss',
            'public/styles/selfserve.css': 'assets/_styles/themes/selfserve.scss',
            'public/styles/internal.css': 'assets/_styles/themes/internal.scss'
        };

        // Define the main JS files for each theme, using the above function
        var scripts = {
            'public/js/internal.js': scriptPaths('internal'),
            'public/js/selfserve.js': scriptPaths('selfserve')
        };

        /**
         * Grunt Tasks
         *
         * List of all separate Grunt tasks used by OLCS-Static
         *
         * - sass
         * - postcss
         * - copy
         * - clean
         * - svg2png
         * - 'dr-svg-sprites'
         * - assemble
         * - browserSync
         * - uglify
         * - jshint
         * - scsslint
         * - notify
         * - watch
         * - karma
         * - localscreenshots
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
                    files: [{
                        expand: true,
                        cwd: 'public/styleguides/selfserve/' + target + '/',
                        src: ['**/*.html'],
                        dest: '../prototypes/' + target + '/'
                    }, {
                        expand: true,
                        cwd: 'public/js/',
                        src: ['selfserve.js', target + '.js'],
                        dest: '../prototypes/' + target + '/js/'
                    }, {
                        expand: true,
                        cwd: 'public/styles/',
                        src: ['selfserve.css'],
                        dest: '../prototypes/' + target + '/styles/'
                    }, {
                        expand: true,
                        cwd: 'public/images/',
                        src: ['**/*.{png,jpg,gif,svg}'],
                        dest: '../prototypes/' + target + '/images/'
                    }, {
                        expand: true,
                        cwd: 'public/fonts/',
                        src: ['**/*'],
                        dest: '../prototypes/' + target + '/fonts/'
                    }]
                },
                images: {
                    files: [{
                        expand: true,
                        cwd: 'assets/_images/',
                        src: ['**/*.{png,jpg,gif,svg}'],
                        dest: 'public/images/'
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
                        src: '**/*.svg',
                        dest: 'public/images/bitmap'
                    },{
                        flatten: true,
                        cwd: 'public/images/svg/',
                        src: 'icon-sprite.svg',
                        dest: 'public/images/svg'
                    }]
                }, 
                sprite: {
                    files: [{
                        flatten: true,
                        cwd: 'public/images/svg/',
                        src: 'icon-sprite.svg',
                        dest: 'public/images/svg'
                    }]
                }
            },

            /**
             * grunt-dr-svg-sprites
             * https://github.com/drdk/grunt-dr-svg-sprites
             */
            'dr-svg-sprites': {
                application: {
                    options: {
                        previewPath: 'public/styleguides',
                        spriteElementPath: 'assets/_images/svg',
                        spritePath: 'public/images/svg/icon-sprite.svg',
                        cssPath: 'assets/_styles/core/icon-sprite.scss',
                        layout: 'vertical',
                        cssSuffix: 'scss',
                        unit: 50
                    }
                }
            },

            svg_sprite: {
                dist: {
                    // Target basics
                    expand: true,
                    cwd: 'assets/_images/svg',
                    src: ['**/*.svg'],
                    transform: ['svgo'],
                    dest: 'public/images/svg',
                    // Target options
                    options: {
                        mode: {
                            css: { // Activate the «css» mode
                                "dest": "../../../public/styles",
                                "sprite": "../images/svg/icon-sprite.svg",
                                "bust": false,
                                "prefix": ".",
                                "dimensions": true,
                                "layout": "vertical",
                                "render": {
                                  "scss": {
                                      "dest": path.resolve() + "/assets/_styles/core/icon-sprite.scss"
                                  } 
                              },
                            }
                        }
                    }
                }
            },

            /**
             * Assemble
             * https://github.com/assemble/grunt-assemble
             */
            assemble: {
                options: {
                    helpers: ['handlebars-helper-repeat']
                },
                internal: {
                    options: {
                        assets: '../../',
                        layout: 'base.hbs',
                        layoutdir: 'styleguides/internal/layouts/',
                        partials: [
                            'styleguides/partials/*.hbs',
                            'styleguides/internal/partials/*.hbs'
                        ]
                    },
                    cwd: 'styleguides/internal/pages',
                    dest: 'public/styleguides/internal',
                    expand: true,
                    src: '**/*.hbs'
                },
                selfserve: {
                    options: {
                        assets: '../../',
                        layout: 'base.hbs',
                        layoutdir: 'styleguides/selfserve/layouts/',
                        partials: [
                            'styleguides/partials/*.hbs',
                            'styleguides/selfserve/partials/*.hbs'
                        ]
                    },
                    cwd: 'styleguides/selfserve/pages',
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
                            pure_funcs: ['OLCS.logger']
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
                    jshintrc: '.jshintrc'
                },
                'static': ['assets/_js/**/*.js', '!assets/_js/**/vendor/*'],
                apps: [
                    '../olcs-common/Common/src/Common/assets/js/inline/**/*.js',
                    '../olcs-internal/module/*/assets/js/inline/**/*.js',
                    '../olcs-selfserve/module/*/assets/js/inline/**/*.js'
                ]
            },

            /**
             * SCSS-Lint
             * https://github.com/ahmednuaman/grunt-scss-lint
             */
            scsslint: {
                allFiles: [
                    'assets/_styles/**/*.scss',
                    '!assets/_styles/vendor/**/*',
                    '!assets/_styles/core/icon-sprite.scss'
                ],
                options: {
                    config: '.scss-lint.yml'
                }
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
                    tasks: ['jshint:static','uglify:dev']
                },
                images: {
                    files: ['assets/_images/**/*.svg'],
                    tasks: ['svg_sprite', 'sass:dev', 'postcss', 'svg2png:all']
                }
            },

            /**
             * Karma
             * https://github.com/karma-runner/grunt-karma
             */
            karma: {
                options: {
                    browsers: ['PhantomJS'],
                    configFile: 'karma.conf.js',
                    singleRun: true,
                    files: testFiles('*'),
                    reporters: ['mocha', 'coverage', 'junit']
                },
                test: {
                    reporters: ['mocha', 'coverage', 'junit']
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
                    path: 'styleguides/screenshots/' + target,
                    type: 'png',
                    local: {
                        path: 'public',
                        port: 3000
                    },
                    viewport: [
                        '600x800', '768x1024', '1200x1024'
                    ],
                },
                src: ['public/styleguides/**/*.html']
            },

        }); // initConfig

        /**
         * Load all NPM tasks automatically using 'matchdep'
         */
        require('matchdep').filterAll([
            'grunt-*', '!grunt-cli', 'assemble'
        ]).forEach(grunt.loadNpmTasks);

        /**
         * Register Grunt Tasks
         *
         * The below tasks are for compiling the app for various
         * scenarios and environments.
         */

        // Default grunt task
        grunt.registerTask('default', 'serve');

        // Function to compile the app
        var compile = function(environment) {
            var tasks = [
                'sass:' + environment,
                'postcss',
                'uglify:' + environment
            ];
            if (environment == 'dev') {
                tasks.push(
                    'assemble'
                );
            };
            if (environment == 'prod') {
                tasks.push();
            };
            return tasks;
        };

        grunt.registerTask('images', [
            'svg_sprite', 'svg2png'
        ]);


        // Compile the app using targeted environment
        // $ grunt compile --env=prod
        grunt.registerTask('compile',
            compile(env)
        );

        // Compile the app for development environment
        grunt.registerTask('compile:dev',
            compile('dev')
        );

        // Compile the app for production environment
        grunt.registerTask('compile:prod',
            compile('prod')
        );

        // JS/SCSS Linting
        grunt.registerTask('lint', [
            'jshint:static',
            'scsslint'
        ]);

        // Serve the app for a development environment
        grunt.registerTask('serve', [
            'notify',
            'compile:dev',
            'browserSync',
            'watch'
        ]);

        // Run unit tests
        grunt.registerTask('test', [
            'karma:test'
        ]);

        grunt.registerTask('test:ci', 'karma:ci');

        // Run single unit test
        // $ grunt test:single --target=componentName
        grunt.registerTask('test:single', [
            'karma:single:' + target
        ]);

        // Submit a story for review
        // $ grunt submit --target=12835
        grunt.registerTask('submit', [
            'lint',
            'test',
            'localscreenshots'
        ]);

        // Create a prototype
        // $ grunt prototype --target=prototypeName
        grunt.registerTask('prototype', [
            'clean:prototype:' + target,
            'copy:prototype:' + target
        ]);

        /**
         * Define a single Jenkins build task here for any relevant environments
         *
         * Generally these will be simple wrappers around other tasks. The main
         * point is that we only ever want jenkins to have to run *one* Grunt task
         * so we don't have to update each job's configuration just to build some
         * new stuff; instead we just add it to this task and we're done
         */

        grunt.registerTask('build:staging', [
            'test:ci', 'compile:prod', 'jshint:static'
        ]);

        grunt.registerTask('build:demo', [
            'test:ci', 'compile:prod'
        ]);

        grunt.registerTask('build:live', [
            'compile:prod'
        ]);

  
    };

}).call(this);