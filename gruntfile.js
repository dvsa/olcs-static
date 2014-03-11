module.exports = function(grunt) {

    grunt.initConfig({
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'static/stylesheets/main.css': 'static/stylesheets/main.scss'
                }
            }
        },
        validation: {
            options: {
                    reset: grunt.option('reset') || false,
                    stoponerror: false,
                    relaxerror: ["Bad value X-UA-Compatible for attribute http-equiv on element meta.",
                                 "Saw <?. Probable cause: Attempt to use an XML processing instruction in HTML. (XML processing instructions are not supported in HTML.)"]
            },
            files: {
                src: ['templates/application-search.php',
                      'templates/form-elements.php']
            }
        },
        watch: {
            scripts: {
                files: ['static/stylesheets/*.scss','templates/*.php'],
                tasks: ['sass', 'validation'],
                options: {
                    spawn: false,
                },
            },

        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-html-validation');

    grunt.registerTask('default', ['watch','sass','validation']);

}