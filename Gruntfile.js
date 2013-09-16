module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            options: {
                forever: true,
                livereload: true
            },
            scripts: {
                files: ['src/lib/**/*.ts', 'sample/src/main.ts'],
                tasks: ['copy:lib', 'typescript:sample'],
                options: {
                }
            }
        },
        typescript: {
            lib: {
                src: ['src/lib/**/*.ts'],
                dest: 'src/test/',
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
                cwd: 'src/lib',
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
    grunt.loadNpmTasks('grunt-mocha');

    // Here we  go !
    grunt.registerTask('default', ['typescript:lib', 'copy:lib']);
    grunt.registerTask('dev', ['typescript:lib', 'copy:lib', 'watch']);
    grunt.registerTask('lib', ['typescript:lib']);
    grunt.registerTask('sample', ['copy:lib', 'typescript:sample']);
    grunt.registerTask('copylib', ['copy:lib']);
};
