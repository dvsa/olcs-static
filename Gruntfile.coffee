module.exports = (grunt) ->

  #src paths
  srcAssets = 'assets/_styles'
  pubStyles = 'public/styles'

  styles =
    'public/styles/selfserve.css':'assets/_styles/selfserve.scss'
    'public/styles/internal.css':'assets/_styles/internal.scss'

  scripts =
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

  grunt.initConfig

    # grunt-contrib-sass
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
          cwd: 'public/styleguides'
          src: '*.html'
          dest: 'public/styleguides'
          ext: '.html'
        ]

    #assemble
    assemble:
      internal:
        options:
          layout: 'internal_base.hbs'
          layoutdir: 'styleguides/layouts'
          partials: 'styleguides/partials/*.hbs'
        cwd: 'styleguides/pages/internal'
        dest: 'public/styleguides/internal'
        expand: true
        src: '**/*.hbs'
      selfserve:
        options:
          layout: 'selfserve_base.hbs'
          layoutdir: 'styleguides/layouts'
          partials: 'styleguides/partials/*.hbs'
        cwd: 'styleguides/pages/selfserve'
        dest: 'public/styleguides/selfserve'
        expand: true
        src: '**/*.hbs'

    # grunt-contrib-watch
    watch:
      options:
        livereload: true
        spawn: false
      styles:
        files: ['assets/_styles/**/*.scss']
        tasks: ['sass:dev']
      hbs:
        files: [
          'styleguides/**/*.hbs'
        ]
        tasks: ['assemble']
      scripts:
        files: ['assets/_js/**/*.js']
        tasks: ['uglify:dev']

    # grunt-browser-sync
    browserSync:
      bsFiles:
        src: [
          'public/**/*.css',
          'public/**/*.html'
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
          baseDir: "./public"

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
      unit:
        configFile: "karma.conf.js",
        singleRun: true,
        browsers: ["PhantomJS"]

  require('matchdep').filterDev([
    'grunt-*'
    'assemble'
  ]).forEach grunt.loadNpmTasks

  grunt.registerTask 'compile:dev', [
    'lint'
    'sass:dev'
    'uglify:dev'
    'assemble:pretty'
  ]

  grunt.registerTask 'compile:staging', [
    'lint'
    'sass:prod'
    'uglify:prod'
    'assemble:pretty'
  ]

  grunt.registerTask 'compile:live', [
    'sass:prod'
    'uglify:prod'
  ]

  grunt.registerTask 'serve', [
    'compile:dev'
    'browserSync'
    'watch'
  ]

  # simple alias...
  grunt.registerTask 'test', ['karma']

  grunt.registerTask 'lint', [
    'coffeelint'
    # jshint to come...
    # ... and possibly CSS
  ]

  grunt.registerTask 'assemble:pretty', [
    'assemble'
    'prettify'
  ]
