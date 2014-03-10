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
                    remotePath: "http://localhost:8888",
                    remoteFiles: ["static/templates"],
                    relaxerror: ["Bad value X-UA-Compatible for attribute http-equiv on element meta."]
            },
            files: {
                    src: ['stylesheets/*.php']
            }
        },
        watch: {
            scripts: {
                files: ['static/stylesheets/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false,
                },
            } 
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-html-validation');

    grunt.registerTask('default', ['watch','sass','validation']);

}