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
        ignorePattern: ['Message_pb.js'],
      },
      tln: ['src/.', 'test/.']
    },

    exec: {
      proto: {
        cmd: ('yarn run pbjs -t static-module -w es6 ' +
          '-o src/Message_pb.js src/Message.proto'),
      },
      protoWeb: {
        cmd: ('yarn run pbjs -t static-module -w closure ' +
          '-o test/Message_pb.js src/Message.proto'),
      },
    },

    rollup: {
      options: {
        moduleName: 'tln',
        format: 'umd',

        plugins: [
          require('rollup-plugin-node-resolve')({
            jsnext: true, browser: true
          }),
          require('rollup-plugin-commonjs')({
            namedExports: {
              'node_modules/protobufjs/minimal.js':
                ['Reader', 'Writer', 'util', 'roots'],
            },
            ignore: [],
          }),
          require('rollup-plugin-replace')({ eval: '[eval][0]' }),
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

  grunt.registerTask('proto', ['exec:proto', 'exec:protoWeb']);
  grunt.registerTask('package', ['uglify']);
  grunt.registerTask('buildjs', ['rollup:tln']);
  grunt.registerTask('build', ['proto', 'buildjs']);
  grunt.registerTask('lint', ['eslint']);

  grunt.registerTask('release', ['lint', 'build', 'package']);
  grunt.registerTask('export', ['release']);

  grunt.registerTask('default', ['lint', 'build']);
};
