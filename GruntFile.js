var targetDir = 'target/main';
var targetTestDir = 'target/test';

module.exports = function(grunt) {
    require('jit-grunt')(grunt);
    require('time-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            server: {
                src: targetDir
            }
        },
        babel: {
            options: {
                sourceMap: true
            }, 
            server: {
                files: [{
                    expand: true,
                    cwd: 'src/main/node',
                    src: ['**/*.js'],
                    dest: targetDir
                }]
            },
            test: {
                files: [{
                    expand: true,
                    cwd: 'src/test/node',
                    src: ['**/*.js'],
                    dest: targetTestDir
                }]
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    growl: true
                },
                src: [targetTestDir + '/**/*.js']
            }
        },
        execute: {
            server: {
                src: targetDir + '/index.js'
            }
        }
    });

    grunt.registerTask('build', ['babel:server']);

    grunt.registerTask('run', ['build', 'execute:server']);
    grunt.registerTask('test', ['build', 'babel:test', 'mochaTest:test']);

    // Default task(s).
    grunt.registerTask('default', ['build']);
};

