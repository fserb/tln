/* global module */

module.exports = function(grunt) {
  "use strict";

  grunt.loadNpmTasks('grunt-rollup');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-uglify-es');

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    watch: {
      scripts: {
        files: ['src/**/*.js'],
        tasks: ['build'],
        options: {
          interrupt: true,
        }
      }
    },

    eslint: {
      tln: ['src/**/*.js', 'test/**/*.js']
    },

    rollup: {
      options: {
        moduleName: 'tln',
        format: 'umd',
      },

      tln: {
        files: {
          'out/tln.js' : ['src/tln.js']
        },
        options: {
          sourceMap: 'inline'
        }
      },

      tlndoc: {
        files: {
          'out/tln.js' : ['src/tln.js']
        },
        options: {
          sourceMap: ''
        }
      }
    },

    uglify: {
      options: {
        mangle: {
          safari10: true,
        }
      },
      tln: {
        files: {
          'out/tln.min.js': ['out/tln.js']
        }
      }
    }
  });

  grunt.registerTask('package', ['uglify']);
  grunt.registerTask('build', ['rollup:tln']);
  grunt.registerTask('lint', ['eslint']);

  grunt.registerTask('release', ['lint', 'build', 'package']);
  grunt.registerTask('export', ['release']);

  grunt.registerTask('default', ['lint', 'build']);
};
