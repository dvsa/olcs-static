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

    prettify:
      options:
        indent: 2
        wrap_line_length: 200
        brace_style: 'expand'
      dist:
        files: [
          expand: true
          cwd: 'public/styleguides'
          src: '*.html'
          dest: 'public/styleguides'
          ext: '.html'
        ]

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

    imagemin:
      options:
        optimizationLevel: 3
      files:
        expand: true
        cwd: 'assets/_images/'
        src: ['**/*.{png,jpg,gif}']
        dest: 'public/images/'

    watch:
      options:
        livereload: true
        spawn: false
      styles:
        files: ['assets/_styles/**/*.scss']
        tasks: ['sass:dev']
      hbs:
        files: ['styleguides/**/*.hbs']
        tasks: ['newer:assemble']
      scripts:
        files: ['assets/_js/**/*.js']
        tasks: ['uglify:dev']
      images:
        files: ['assets/_images/**/*.{png,jpg,gif}']
        tasks: ['newer:imagemin']
      # htmllint:
      #   files: ['public/styleguides/**/*.html']
      #   tasks: ['newer:htmllint']

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

    htmllint:
      all: ['public/styleguides/**/*.html']
      options:
        ignore: [
          'Bad value “X-UA-Compatible” for attribute ' +
          '“http-equiv” on XHTML element “meta”.'
        ]

    uglify:
      dev:
        options:
          sourceMap: true
        files: scripts
      prod:
        options:
          sourceMap: false
        files: scripts

    jshint:
      options:
        jshintrc: ".jshintrc"
      all: [
        "assets/_js/**/*.js"
        "!assets/_js/**/vendor/*"
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
    'assemble:pretty'
  ]

  grunt.registerTask 'compile:staging', [
    'lint'
    'sass:prod'
    'uglify:prod'
    #'images'
    'assemble:pretty'
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
    'jshint'
  ]

  grunt.registerTask 'assemble:pretty', [
    'newer:assemble'
    'prettify'
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
