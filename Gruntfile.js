module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    exec: {
        deploy_dummy_db: {
            cmd: 'firebase database:set -y / ./database.dummy-data.json'
        },
        local_serve: {
            cmd: 'ng serve --port=4202',
            options: {
                maxBuffer: 1024*1024
            }
        },
        clean_dist: {
            cmd: 'rm -rf ./dist'
        },
        build: {
            cmd: 'ng build',
            options: {
                maxBuffer: 1024*1024
            }
        },
        deploy: {
            cmd: 'firebase deploy'
        }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-exec');

  // Default task(s).
  grunt.registerTask('default', ['exec:deploy_dummy_db', 'exec:local_serve']);
  grunt.registerTask('deploy', ['exec:clean_dist', 'exec:build', 'exec:deploy']);
};