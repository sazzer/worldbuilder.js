var path = require('path');

var targetDir = 'target';
var targetMainDir = path.join(targetDir, 'main');
var targetTestDir = path.join(targetDir, 'test');
var targetDocDir = path.join(targetDir, 'doc');

module.exports = function(grunt) {
    require('jit-grunt')(grunt, {
        mochacli: 'grunt-mocha-cli'
    });
    require('time-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            server: {
                src: 'target'
            }
        },
        env: {
            server: {
                NODE_PATH: targetMainDir
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
        mochacli: {
            server: {
                options: {
                    resursive: true,
                    reporter: 'spec',
                    files: [path.join(targetTestDir, '**/*.js')]
                }
            }
        },
        json_generator: {
            esdoc: {
                dest: path.join(targetDocDir, 'esdoc.json'),
                options: {
                    source: 'src/node/main',
                    destination: targetDocDir,
                    access: ['public', 'protected', 'private'],
                    autoPrivate: true,
                    unexportIdentifier: true,
                    undocumentIdentifier: true,
                    builtinExternal: true,
                    coverage: true,
                    test: {
                        type: 'mocha',
                        source: 'src/node/test'
                    },
                    title: 'Worldbuilder'
                }
            }
        },
        watch: {
            build: {
                files: ['src/node/**/*'],
                tasks: ['doc', 'test'],
                options: {
                    spawn: true,
                    atBegin: true
                }
            }
        },
        execute: {
            server: {
                src: path.join(targetMainDir, 'index.js')
            },
            esdoc: {
                src: 'node_modules/.bin/esdoc',
                options: {
                    args: [
                        '-c',
                        path.join(targetDocDir, 'esdoc.json')
                    ]
                }
            }
        }
    });

    grunt.registerTask('build', ['babel:server']);
    grunt.registerTask('doc', ['json_generator:esdoc', 'execute:esdoc']);

    grunt.registerTask('run', ['env:server', 'build', 'execute:server']);
    grunt.registerTask('test', ['env:server', 'build', 'babel:test', 'mochacli:server']);

    // Default task(s).
    grunt.registerTask('default', ['build', 'doc', 'test']);
};
