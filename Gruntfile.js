module.exports = function(grunt) {

  grunt.initConfig({
    bgShell: {
      _defaults: {
        bg: true
      },
      watchJade: {
        cmd: 'grunt regarde:jade'
      },
      watchHtml: {
        cmd: 'grunt regarde:html'
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
    regarde: {
      sass: {
        files: ['sass/*', 'sass/module/*'],
        tasks: 'compass:compile'
      },
      css: {
        files: 'public/css/*',
        tasks: 'livereload'
      },
      jade: {
        files: 'jade/*',
        tasks: 'jade:compile',
      },
      html: {
        files: 'public/*.html',
        tasks: 'livereload'
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
    }
  })

  grunt.loadNpmTasks('grunt-contrib-livereload')
  grunt.loadNpmTasks('grunt-contrib-compass')
  grunt.loadNpmTasks('grunt-regarde')
  grunt.loadNpmTasks('grunt-bg-shell')
  grunt.loadNpmTasks('grunt-jade')

  grunt.registerTask('default', ['livereload-start', 'bgShell:compileSass', 'jade:compile', 'regarde'])
}
