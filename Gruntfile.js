module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            options: {
                forever: true,
                livereload: true
            },
            scripts: {
                files: ['*.ts'],
                tasks: ['typescript'],
                options: {
                }
            }
        },
        typescript: {
            base: {
                src: ['*.ts'],
                options: {
                    module: 'amd',
                    nolib: false,
                    target: 'es5'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Here we  go !
    grunt.registerTask('default', ['typescript', 'watch']);
};
