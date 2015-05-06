var targetDir = 'target';

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

    // Default task(s).
    grunt.registerTask('default', ['build']);
};

