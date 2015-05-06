module.exports = function(grunt) {
    require('jit-grunt')(grunt);
    require('time-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        babel: {
            options: {
                sourceMap: true
            }, 
            server: {
                files: [{
                    expand: true,
                    cwd: 'src/main/node',
                    src: ['**/*.js'],
                    dest: 'target'
                }]
            }
        },
        execute: {
            server: {
                src: 'target/index.js'
            }
        }
    });

    // Default task(s).
    grunt.registerTask('default', ['babel:server']);

    grunt.registerTask('run', ['default', 'execute:server']);
};

