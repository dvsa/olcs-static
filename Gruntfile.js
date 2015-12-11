//=================================================================
// OLCS - Grunt Setup
//=================================================================

(function() {

    "use strict";

    module.exports = function(grunt) {

        //---------------------------------------------------------
        // Config
        //---------------------------------------------------------

        var pubStyles, scriptPaths, scripts, srcAssets, styles, prototypeName, globalConfig;

        srcAssets = 'assets/_styles';
        pubStyles = 'public/styles';

        styles = {
            'public/styles/selfserve.css': srcAssets + '/themes/selfserve.scss',
            'public/styles/internal.css' : srcAssets + '/themes/internal.scss'
        };

        globalConfig = {};

        scriptPaths = function(path) {
            var paths;
            return paths = [
                "assets/_js/common/vendor/jquery.1.11.0.js",
                "assets/_js/common/vendor/chosen.jquery.min.js",
                "assets/_js/common/vendor/jquery.details.min.js",
                "assets/_js/common/*.js",
                "assets/_js/" + path + "/*.js",
                "assets/_js/init/common.js",
                "assets/_js/init/" + path + ".js"
            ];
        };

        scripts = {
            "public/js/internal.js" : scriptPaths("internal"),
            "public/js/selfserve.js": scriptPaths("selfserve")
        };

        //---------------------------------------------------------
        // Tasks
        //---------------------------------------------------------

        grunt.initConfig({

            globalConfig: globalConfig,

            //-----------------------------------------------------
            // Sass
            // https://github.com/sindresorhus/grunt-sass
            //-----------------------------------------------------

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

            //-----------------------------------------------------
            // Post CSS
            // https://github.com/nDmitry/grunt-postcss
            //-----------------------------------------------------

            postcss: {
                options: {
                    processors: [
                        require('autoprefixer')({
                            browsers: ['last 2 versions']
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

            //-----------------------------------------------------
            // Copy
            // https://github.com/gruntjs/grunt-contrib-copy
            //-----------------------------------------------------

            copy: {
                prototype: {
                    files: [
                        {
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
                        }, {
                            expand: true,
                            cwd: 'public/fonts/',
                            src: ['**/*'],
                            dest: '../prototypes/<%= globalConfig.prototypeName %>/fonts/'
                        }
                    ]
                }
            },

            //-----------------------------------------------------
            // Clean
            // https://github.com/gruntjs/grunt-contrib-clean
            //-----------------------------------------------------

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
                }
            },

            //-----------------------------------------------------
            // Notify
            // https://github.com/dylang/grunt-notify
            //-----------------------------------------------------

            notify: {
                options: {
                    sucess: false
                }
            },

            //-----------------------------------------------------
            // Assemble
            // https://github.com/assemble/grunt-assemble
            //-----------------------------------------------------

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

            //-----------------------------------------------------
            // Watch
            // https://github.com/gruntjs/grunt-contrib-watch
            //-----------------------------------------------------

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
                    tasks: ['assemble']
                },
                scripts: {
                    files: ['assets/_js/**/*.js'],
                    tasks: ['uglify:dev']
                }
            },

            //-----------------------------------------------------
            // Browser Sync
            // https://github.com/BrowserSync/grunt-browser-sync
            //-----------------------------------------------------

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

            //-----------------------------------------------------
            // Uglify
            // https://github.com/gruntjs/grunt-contrib-uglify
            //-----------------------------------------------------

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

            //-----------------------------------------------------
            // JSHint
            // https://github.com/gruntjs/grunt-contrib-jshint
            //-----------------------------------------------------

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

            //-----------------------------------------------------
            // SCSS-Lint
            // https://github.com/brigade/scss-lint
            //-----------------------------------------------------

            scsslint: {
                allFiles: [
                    'assets/_styles/**/*.scss',
                    '!assets/_styles/vendor/**/*'
                ],
                options: {}
            },

            //-----------------------------------------------------
            // Karma
            // https://github.com/karma-runner/grunt-karma
            //-----------------------------------------------------

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

            //-----------------------------------------------------
            // grunt-localscreenshots
            // https://github.com/danielhusar/grunt-localscreenshots
            //
            // @NOTE: You'll need PhantomJs install locally to get
            // this task to work
            //-----------------------------------------------------

            localscreenshots: {
                options: {
                    path: 'styleguides/screenshots',
                    type: 'png',
                    local : {
                        path: 'public',
                        port: 3000
                    },
                    viewport: [
                        '600x800',
                        '768x1024',
                        '1200x1024'
                    ],
                },
                src: ['public/styleguides/**/*.html']
            }

        }); // initConfig

        //---------------------------------------------------------
        // Load NPM Tasks
        //---------------------------------------------------------

        if (grunt.option("production")) {
            grunt.loadNpmTasks("grunt-sass");
            grunt.loadNpmTasks("grunt-contrib-uglify");
        } else {
            require('matchdep').filterAll(['grunt-*', 'assemble']).forEach(grunt.loadNpmTasks);
        }

        //---------------------------------------------------------
        // Register Environments
        //---------------------------------------------------------

        grunt.registerTask('compile:dev', [
            'lint',
            'sass:dev',
            'uglify:dev',
            'assemble'
        ]);

        grunt.registerTask('compile:staging', [
            'lint',
            'sass:prod',
            'uglify:prod',
            'assemble'
        ]);

        grunt.registerTask('compile:live', [
            'sass:prod',
            'uglify:prod'
        ]);

        //---------------------------------------------------------
        // Register General Grunt Tasks
        //---------------------------------------------------------

        // JS/SCSS Linting
        //grunt.registerTask('lint', ['jshint:static', 'scsslint']);
        grunt.registerTask('lint', ['jshint:static']);

        // Browser Sync
        grunt.registerTask('serve', ['notify', 'compile:dev', 'browserSync', 'watch']);

        // Karma
        grunt.registerTask('test', ['karma:test']);
        grunt.registerTask('test:ci', ['karma:ci']);

        //---------------------------------------------------------
        // Prototype Tasks
        //---------------------------------------------------------

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

        grunt.registerTask('interim-prototype', function(directory) {
            globalConfig.prototypeName = 'interim-prototype';
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
