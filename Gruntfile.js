module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            options: {
                forever: true,
                livereload: true
            },
            scripts: {
                files: ['lib/**/*.ts', 'sample/src/main.ts'],
                tasks: ['copy:lib', 'typescript:sample'],
                options: {
                }
            }
        },
        typescript: {
            lib: {
                src: ['lib/**/*.ts'],
                dest: 'js/',
                options: {
                    module: 'amd',
                    base_path: 'lib'
                }
            },
            sample: {
                src: ['sample/src/**/*.ts'],
                dest: 'sample/javascripts',
                options: {
                    module: 'amd',
                    base_path: 'sample/src'
                }
            }
        },
        copy: {
            lib: {
                cwd: 'lib',
                src: ['**'],
                dest: 'sample/src/lib',
                flatten: false,
                expand: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Here we  go !
    grunt.registerTask('default', ['copy:lib', 'typescript:sample']);
    grunt.registerTask('dev', ['copy:lib', 'typescript:sample', 'watch']);
    grunt.registerTask('lib', ['typescript:lib']);
    grunt.registerTask('sample', ['copy:lib', 'typescript:sample']);
};
