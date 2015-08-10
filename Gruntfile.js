'use strict';

module.exports = function(grunt) {

    var dist_path = 'dist/';
    var src_path = 'src/';

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-angular-template-inline-js');
    grunt.loadNpmTasks('grunt-contrib-clean');
    //grunt.loadNpmTasks('grunt-angular-templates');
	//grunt.loadNpmTasks('grunt-karma');

	function init(params) {
		grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
            angular_template_inline_js: {
                options: {
                    basePath: __dirname
                },
                production: {
                    src:  src_path + 'carousel-presse.js',
                    dest: 'dist/tmp.js'
                }
            },
            clean: {
                dist: [dist_path + "tmp.js"]
            },
			concat: {
				devCss: {
					src:    [],
					dest:   []
				}
			},
			jshint: {
				options: {
					//force:          true,
					globalstrict:   true,
					//sub:            true,
					node: true,
					loopfunc: true,
					browser:        true,
					devel:          true,
					globals: {
						angular:    false,
						$:          false,
						moment:		false,
						Pikaday: false,
						module: false,
						forge: false
					}
				},
				beforeconcat:   {
					options: {
						force:	false,
						ignores: ['**.min.js']
					},
					files: {
						src: []
					}
				},
				//quick version - will not fail entire grunt process if there are lint errors
				beforeconcatQ:   {
					options: {
						force:	true,
						ignores: ['**.min.js']
					},
					files: {
						src: ['**.js']
					}
				}
			},
			uglify: {
				options: {
					mangle: false
				},
				build: {
					files:  {},
					/*src:    src_path + 'carousel-presse.js',*/
                    src: dist_path + 'tmp.js',
					dest: dist_path + 'carousel-presse.min.js'
				}
			},
			less: {
				development: {
					options: {},
					files: {
                        "dist/carousel-presse.css": src_path + "carousel-presse.less"
					}
				}
			},
			cssmin: {
				dev: {
					src: [dist_path + 'carousel-presse.css'],
					dest: dist_path + 'carousel-presse.min.css'
				}
			}/*,
			karma: {
				unit: {
					configFile: publicPathRelativeRoot+'config/karma.conf.js',
					singleRun: true,
					browsers: ['PhantomJS']
				}
			}*/
		});
		
		
		/**
		register/define grunt tasks
		@toc 6.
		*/
		// Default task(s).
		// grunt.registerTask('default', ['jshint:beforeconcat', 'less:development', 'concat:devJs', 'concat:devCss']);
		grunt.registerTask('default', ['jshint:beforeconcatQ', 'less:development', 'cssmin' , 'angular_template_inline_js:production', 'uglify:build', 'clean:dist']);
	
	}
	init({});		//initialize here for defaults (init may be called again later within a task)

};