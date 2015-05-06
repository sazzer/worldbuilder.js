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
        }
    });

    // Default task(s).
    grunt.registerTask('default', ['babel:server']);

};

