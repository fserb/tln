/* global module require */

module.exports = function(grunt) {
  "use strict";

  grunt.loadNpmTasks('grunt-rollup');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-uglify-es');
  grunt.loadNpmTasks('grunt-exec');

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    watch: {
      scripts: {
        files: ['src/**/*.js'],
        tasks: ['buildjs'],
        options: {
          interrupt: true,
        }
      },
      proto: {
        files: ['src/**/*.proto'],
        tasks: ['proto'],
        options: {
          interrupt: true,
        }
      }
    },

    eslint: {
      options: {
        ignorePattern: 'src/proto/*',
      },
      tln: ['src/.', 'test/.']
    },

    exec: {
      proto: {
        cmd: 'protoc src/Message.proto --js_out=import_style=commonjs,binary:.',
      },
    },

    rollup: {
      options: {
        moduleName: 'tln',
        format: 'umd',
        plugins: [
          require('rollup-plugin-node-resolve')({
          }),
          require('rollup-plugin-commonjs')({
            ignore: [],
          }),
          require('rollup-plugin-node-builtins')(),
          require('rollup-plugin-node-globals')(),
          require('rollup-plugin-replace')({
            // google-protobuf uses eval() for some reason.
            eval: undefined, }),
        ]
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

  grunt.registerTask('proto', ['exec:proto']);
  grunt.registerTask('package', ['uglify']);
  grunt.registerTask('buildjs', ['rollup:tln']);
  grunt.registerTask('build', ['proto', 'buildjs']);
  grunt.registerTask('lint', ['eslint']);

  grunt.registerTask('release', ['lint', 'build', 'package']);
  grunt.registerTask('export', ['release']);

  grunt.registerTask('default', ['lint', 'build']);
};
