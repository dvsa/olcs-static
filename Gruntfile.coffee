module.exports = (grunt) ->

  #src paths
  srcAssets = 'assets/_styles'
  pubStyles = 'public/styles'

  grunt.initConfig

    # grunt-contrib-sass
    sass:
      dev:
        options:
          style: 'expanded'
          sourcemap: true
        files:
          'public/styles/selfserve.css':'assets/_styles/selfserve.scss'
          'public/styles/internal.css':'assets/_styles/internal.scss'

    # grunt-coffee-lint
    coffeelint:
      app: 'Gruntfile.coffee'
      options:
        'no_trailing_whitespace':
          'level': 'error'

    # grunt-prettify
    prettify:
      options:
        indent: 2
        wrap_line_length: 200
        brace_style: 'expand'
      dist:
        files: [
          expand: true
          cwd: 'styleguides'
          src: '*.html'
          dest: 'styleguides'
          ext: '.html'
        ]

    #assemble
    assemble:
      internal:
        options:
          assets:'public'
          layout: 'internal_base.hbs'
          layoutdir: 'styleguides/layouts'
          partials: 'styleguides/partials/*.hbs'
        cwd: 'styleguides/pages/internal'
        dest: 'styleguides/dist/internal'
        expand: true
        src: '**/*.hbs'
      selfserve:
        options:
          assets:'public'
          layout: 'selfserve_base.hbs'
          layoutdir: 'styleguides/layouts'
          partials: 'styleguides/partials/*.hbs'
        cwd: 'styleguides/pages/selfserve'
        dest: 'styleguides/dist/selfserve'
        expand: true
        src: '**/*.hbs'

    # grunt-contrib-watch
    watch:
      options:
        livereload: true
        spawn: false
      styles:
        files: ['assets/_styles/{,*/}*.scss']
        tasks: ['sass:dev']
      hbs:
        files: [
          'styleguides/partials/{,*/}*.hbs',
          'styleguides/layouts/{,*/}*.hbs',
          'styleguides/pages/internal/{,*/}*.hbs',
          'styleguides/pages/selfserve/{,*/}*.hbs'
        ]
        tasks: ['assemble']
      scripts:
        files: ['assets/_js/**/*.js']
        tasks: ['uglify:build']

    # grunt-contrib-connect
    connect:
      server:
        options:
          port: 7000
          base: './ '
          livereload: true
          hostname: 'localhost'

    # grunt-browser-sync
    browserSync:
      bsFiles:
        src: [
          'public/styles/*.css',
          'styleguides/{,*/}*.hbs'
        ]
      options:
        port: 7001
        open: true
        ghostMode:
          clicks: true
          scroll: true
          links: true
          forms: true
        watchTask: true
        server:
          baseDir: "./"

    uglify:
      options:
        sourceMap: true
      build:
        files:
          "public/js/internal.js": [
            "assets/_js/common/vendor/**/*.js"
            "assets/_js/common/*.js"
            "assets/_js/internal/*.js"
          ]
          "public/js/selfserve.js": [
            "assets/_js/common/vendor/**/*.js"
            "assets/_js/common/*.js"
            "assets/_js/selfserve/*.js"
          ]

  require('matchdep').filterDev([
    'grunt-*'
    'assemble'
  ]).forEach grunt.loadNpmTasks

  grunt.registerTask 'compile', [
    'sass:dev'
    'assemble'
  ]

  grunt.registerTask 'clean', [
    'coffeelint'
    'prettify'
  ]

  grunt.registerTask 'serve', [
    'compile'
    'clean'
    'connect'
    'browserSync'
    'watch'
  ]
