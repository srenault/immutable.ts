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
        ts: {
            lib: {
                src: ['src/lib/**/*.ts'],
                outDir: 'src/test/lib/immutable',
                options: {
                    module: 'amd',
                    base_path: 'lib'
                }
            },
            sample: {
                src: ['sample/src/**/*.ts'],
                outDir: 'sample/javascripts/lib/immutable',
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

    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-mocha');

    // Here we  go !
    grunt.registerTask('default', ['ts:lib', 'copy:lib']);
    grunt.registerTask('dev', ['ts:lib', 'copy:lib', 'watch']);
    grunt.registerTask('lib', ['ts:lib']);
    grunt.registerTask('sample', ['copy:lib', 'ts:sample']);
    grunt.registerTask('copylib', ['copy:lib']);
};
