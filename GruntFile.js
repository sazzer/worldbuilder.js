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
                files: {
                    'target/server.js': 'src/main/node/index.js'
                }
            }
        }
    });

    // Default task(s).
    grunt.registerTask('default', ['babel:server']);

};

