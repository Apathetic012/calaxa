module.exports = function(grunt) {

  grunt.initConfig({
    bgShell: {
      _defaults: {
        bg: true
      },
      watchJade: {
        cmd: 'grunt watch:jade'
      },
      watchHtml: {
        cmd: 'grunt watch:html'
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
        tasks: 'jade:compile',
      },
      html: {
        files: 'public/*.html',
        tasks: 'growl:notify',
        options: {
          nospawn: true
        }
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
    growl: {
      notify: {
        message: 'foo'
      }
    }
  })

  grunt.event.on('watch', function(action, path) {
    var match = path.match(/public\/(.*\.html)/)
    if (match instanceof Array) {
      grunt.config(['growl', 'notify', 'message'], match[1] + ' updated.')
    }
  })

  grunt.loadNpmTasks('grunt-contrib-livereload')
  grunt.loadNpmTasks('grunt-contrib-compass')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-bg-shell')
  grunt.loadNpmTasks('grunt-jade')
  grunt.loadNpmTasks('grunt-growl')

  grunt.registerTask('default', ['bgShell:compileSass', 'jade:compile', 'bgShell:watchJade', 'bgShell:watchHtml', 'watch:sass'])
}
