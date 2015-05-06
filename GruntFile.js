var targetDir = 'target';
var targetMainDir = targetDir + '/main';
var targetTestDir = targetDir + '/test';

module.exports = function(grunt) {
    require('jit-grunt')(grunt);
    require('time-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            server: {
                src: 'target'
            }
        },
        babel: {
            options: {
                sourceMap: true
            }, 
            server: {
                files: [{
                    expand: true,
                    cwd: 'src/node/main',
                    src: ['**/*.js'],
                    dest: targetMainDir
                }]
            },
            test: {
                files: [{
                    expand: true,
                    cwd: 'src/node/test',
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
                src: targetMainDir + '/index.js'
            }
        }
    });

    grunt.registerTask('build', ['babel:server']);

    grunt.registerTask('run', ['build', 'execute:server']);
    grunt.registerTask('test', ['build', 'babel:test', 'mochaTest:test']);

    // Default task(s).
    grunt.registerTask('default', ['build']);
};

