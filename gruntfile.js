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
        watch: {
            scripts: {
                files: ['static/stylesheets/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false,
                },
            },

        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('default', ['watch','sass']);

}