module.exports = (grunt) ->

  srcAssets = 'assets/_styles'
  pubStyles = 'public/styles'

  styles =
    'public/styles/selfserve.css':'assets/_styles/selfserve.scss'
    'public/styles/internal.css':'assets/_styles/internal.scss'

  scriptPaths = (path) ->
    paths = [
      "assets/_js/common/vendor/jquery.1.11.0.js"
      "assets/_js/common/vendor/**/*.js"
      "assets/_js/common/*.js"
      "assets/_js/#{path}/*.js"
      "assets/_js/init/common.js"
      "assets/_js/init/#{path}.js"
    ]

  scripts =
    "public/js/internal.js": scriptPaths "internal"
    "public/js/selfserve.js": scriptPaths "selfserve"

  grunt.initConfig

    sass:
      dev:
        options:
          style: 'expanded'
          sourcemap: true
        files: styles
      prod:
        options:
          style: 'compressed'
          sourcemap: false
        files: styles

    coffeelint:
      app: 'Gruntfile.coffee'
      options:
        'no_trailing_whitespace':
          'level': 'warn'
        max_line_length:
          value: 80
          level: "warn"

    notify:
      options:
        sucess: false

    assemble:
      internal:
        options:
          layout: 'base.hbs'
          layoutdir: 'styleguides/layouts/internal/'
          partials: 'styleguides/partials/*.hbs'
        cwd: 'styleguides/pages/internal'
        dest: 'public/styleguides/internal'
        expand: true
        src: '**/*.hbs'
      selfserve:
        options:
          layout: 'base.hbs'
          layoutdir: 'styleguides/layouts/selfserve/'
          partials: 'styleguides/partials/*.hbs'
        cwd: 'styleguides/pages/selfserve'
        dest: 'public/styleguides/selfserve'
        expand: true
        src: '**/*.hbs'

    watch:
      options:
        livereload: true
        spawn: false
      styles:
        files: ['assets/_styles/**/*.scss']
        tasks: ['sass:dev']
      hbs:
        files: ['styleguides/**/*.hbs']
        tasks: ['assemble']
      scripts:
        files: ['assets/_js/**/*.js']
        tasks: ['uglify:dev']
      images:
        files: ['assets/_images/**/*.{png,jpg,gif}']
        tasks: ['imagemin']

    browserSync:
      bsFiles:
        src: [
          'public/**/*.css',
          'public/**/*.html'
        ]
      options:
        port: 7001
        open: false
        notify: false
        ghostMode:
          clicks: true
          scroll: true
          links: true
          forms: true
        watchTask: true
        server:
          baseDir: './public'

    uglify:
      dev:
        options:
          sourceMap: true
        files: scripts
      prod:
        options:
          sourceMap: false
          compress:
            pure_funcs: ["OLCS.logger"]
        files: scripts

    jshint:
      options:
        jshintrc: ".jshintrc"
      static: [
        "assets/_js/**/*.js"
        "!assets/_js/**/vendor/*"
      ],
      apps: [
        "../olcs-common/Common/src/Common/assets/js/inline/**/*.js",
        "../olcs-internal/module/*/assets/js/inline/**/*.js",
        "../olcs-selfserve/module/*/assets/js/inline/**/*.js"
      ]

    karma:
      options:
        browsers: ["PhantomJS"]
        configFile: "karma.conf.js"
        singleRun: true
      test:
        reporters: ["mocha", "coverage", "junit"]
      ci:
        colors: false

  if grunt.option("production")
    grunt.loadNpmTasks "grunt-contrib-sass"
    grunt.loadNpmTasks "grunt-contrib-uglify"
    #grunt.loadNpmTasks "grunt-contrib-imagemin"
  else
    require('matchdep').filterAll([
      'grunt-*'
      'assemble'
    ]).forEach grunt.loadNpmTasks


  grunt.registerTask 'compile:dev', [
    'lint'
    'sass:dev'
    'uglify:dev'
    #'images'
    'assemble'
  ]

  grunt.registerTask 'compile:staging', [
    'lint'
    'sass:prod'
    'uglify:prod'
    #'images'
    'assemble'
  ]

  grunt.registerTask 'compile:live', [
    'sass:prod'
    'uglify:prod'
    #'images'
  ]

  grunt.registerTask 'serve', [
    'notify'
    'compile:dev'
    'browserSync'
    'watch'
  ]

  grunt.registerTask 'images', ['imagemin']

  grunt.registerTask 'test', ['karma:test']
  grunt.registerTask 'test:ci', ['karma:ci']

  grunt.registerTask 'lint', [
    'coffeelint'
    'jshint:static'
  ]

  ###
  # Define a single Jenkins build task here for any relevant environments
  #
  # Generally these will be simple wrappers around other tasks. The main
  # point is that we only ever want jenkins to have to run *one* Grunt task
  # so we don't have to update each job's configuration just to build some
  # new stuff; instead we just add it to this task and we're done
  ###
  grunt.registerTask 'build:staging', ['test:ci', 'compile:staging']

  grunt.registerTask 'build:demo', ['test:ci', 'compile:live']
