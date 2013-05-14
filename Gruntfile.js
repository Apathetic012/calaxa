module.exports = function(grunt) {

  grunt.initConfig({
    bgShell: {
      _defaults: {
        bg: true
      },
      watchJade: {
        cmd: 'grunt watch:jade'
      },
      compileSass: {
        cmd: 'compass compile --force',
        bg: false
      }
    },
    compass: {
      compile: {
        options: {
          config: 'config.rb'
        }
      }
    },
    watch: {
      sass: {
        files: 'sass/*',
        tasks: 'compass:compile',
        options: {
          livereload: true
        }
      },
      jade: {
        files: 'jade/*',
        tasks: 'jade:compile'
      }
    },
    jade: {
      compile: {
        files: {
          'public/': ['jade/*.jade']
        },
        options: {
          client: false
        }
      }
    },
    livereload: {
      port: 45462
    }
  })

  grunt.loadNpmTasks('grunt-contrib-livereload')
  grunt.loadNpmTasks('grunt-contrib-compass')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-bg-shell')
  grunt.loadNpmTasks('grunt-jade')

  grunt.registerTask('default', ['livereload-start', 'bgShell:compileSass', 'jade:compile', 'bgShell:watchJade', 'watch:sass'])
}
