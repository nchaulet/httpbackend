
module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-protractor-webdriver');
	grunt.loadNpmTasks('grunt-protractor-runner');
	grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.initConfig({
    // Configure a mochaTest task
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/units/*.js']
      }
    },
    protractor: {
    	options: {
      	keepAlive: false, // If false, the grunt process stops when the test fails.
      	noColor: false, // If true, protractor will not use colors in its output.
      	args: {}
    	},
    	e2e: {
        options: {
            configFile: 'protractor-conf.js', // Target-specific config file
        }
    	}
    },
		protractor_webdriver: {
    	webdriver: {
      	options: {
        	path: 'node_modules/.bin/'
      	},
    	},
  	},
	  connect: {
	    server: {
	      options: {
	        port: 8080,
	        base: 'test/app'
	      }
	    }
	  }
  });

  grunt.registerTask('test', [ 'connect:server', 'mochaTest', 'protractor_webdriver', 'protractor:e2e']);
};
