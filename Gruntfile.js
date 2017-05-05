/*
 * @author Antonio Gatta <a.gatta@xeader.com>
 * @url http://www.xeader.com
 * @copyright Copyright (c) 2017
 * @license All right reserved
 */

module.exports = function (grunt) {

    var config = {
        app: 'minimal-grunt',
        dist: 'dist',
        scripts: 'js',
        images: 'img',
        styles: 'css'
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        express: {
            options: {
                script: 'server.js',
                port: 9000,
            },
            defaults: {
                livereload: true
            }
        },

        growl: {
            myMessage: {
                message: "Success",
                title: "Compile",
                image: __dirname + "/favicon.png"
            }
        },

        sass: {
            options: {
                sourceMap: true,
                precision: 4,
                //outputStyle: 'compressed',
                includePaths: ['bower_components']
            },

            // Takes every file that ends with .scss from the scss
            // directory and compile them into the css directory.
            // Also changes the extension from .scss into .css.
            // Note: file name that begins with _ are ignored automatically
            files: {
                expand: true,
                cwd: 'scss',
                src: ['*.scss'],
                dest: 'css',
                ext: '.css'
            }
        },

        webfont: {
            luijo: {
                src: 'fonts/' + config.app + '/svg/*.svg',
                dest: 'fonts/' + config.app + '',
                destCss: 'fonts/' + config.app + '',
                options: {
                    stylesheet: 'scss',
                    stylesheets: ['css', 'scss'],
                    font: config.app,
                    fontFilename: config.app,
                    codepointsFile: 'fonts/' + config.app + '/svg/codepoints.json',
                    types: 'eot,woff2,woff,ttf,svg',
                    relativeFontPath: '../fonts/' + config.app,
                    templateOptions: {
                        "baseClass": config.app + "-icon",
                        "classPrefix": config.app + "-icon_"
                    },
                    normalize: true
                }
            }
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'css',
                    src: '{,*/}*.css',
                    dest: 'css'
                }]
            }
        },

        codekit: {
            options: {
                compilePrefixed: false
            },
            kit: {
                src: 'kit/*.kit',
                dest: '.'
            }
        },

        copy: {
            jsPlugins: {
                files: [
                    {expand: true, flatten: true, src: 'bower_components/modernizr/modernizr.js', dest: 'js/vendor'},
                    {expand: true, flatten: true, src: 'bower_components/jquery/dist/jquery.js', dest: 'js/vendor'},
                ]
            },
            modernizr: {
                src: 'js/vendor/modernizr.js',
                dest: 'js/vendor/modernizr.min.js'
            }
            // fancyboxCss: {
            //     src: 'bower_components/fancybox/source/jquery.fancybox.css',
            //     dest: 'scss/modules/plugins/jquery.fancybox.scss'
            // }
        },

        concat: {
            options: {
                separator: ';',
                sourceMap: true
            },
            app: {
                files: {
                    'js/app.min.js': [
                        'js/app.js',
                        'js/app/layout/*.js',
                        'js/app/pages/*.js',
                    ]
                }
            },
            plugins: {
                files: {
                    'js/plugins.min.js': [

                        // jQuery
                        'js/plugins/prepend_plugins.js',
                        'js/plugins/!{prepend|append|jquery-wrapper}*.js',
                        'js/plugins/jquery-wrapper-start.js',
                        'bower_components/jquery/dist/jquery.js',
                        'js/plugins/jquery-wrapper-end.js',
                        // layout
                        'bower_components/foundation/js/foundation.js',
                        'bower_components/fastclick/lib/fastclick.js',
                        // plugins
                        // 'bower_components/slick-carousel/slick/slick.js',
                        // 'bower_components/jquery-mousewheel/jquery.mousewheel.js',
                        // 'bower_components/jquery_appear/jquery.appear.js',
                        // 'bower_components/jquery-easing-original/jquery.easing.js',
                        'bower_components/scrollreveal/dist/scrollReveal.min.js',
                        'bower_components/gsap/src/uncompressed/TweenLite.js',
                        'bower_components/gsap/src/uncompressed/TweenMax.js',
                        // 'bower_components/gsap/src/uncompressed/plugins/ScrollToPlugin.js',
                        // 'bower_components/fancybox/source/jquery.fancybox.pack.js',
                        // 'bower_components/jquery-ui/jquery-ui.js',
                        // 'bower_components/jquery-deparam/jquery-deparam.js',
                        // 'bower_components/packery/dist/packery.pkgd.js',
                        // 'bower_components/isotope/dist/isotope.pkgd.min.js',
                        // 'bower_components/isotope-packery/packery-mode.js',
                        // 'bower_components/imagesloaded/imagesloaded.pkgd.min.js',
                        // 'bower_components/jquery-hoverintent/jquery.hoverIntent.js',

                        'js/plugins/append_plugins.js'
                        // Modules

                    ]
                }
            }
        },

        uglify: {
            options: {
                sourceMap: false,
                mangle: true,
                compress: true,
                banner: '/* ' + Date.now() + ' */',
            },
            modernizr: {
                src: [
                    'js/vendor/modernizr.js'
                ],
                dest: 'js/dist/vendor/modernizr.min.js'
            },
            appJs: {
                src: [
                    'js/app.min.js',
                ],
                dest: 'js/dist/app.min.js'
            },
            pluginJs: {
                src: [
                    'js/plugins.min.js',
                ],
                dest: 'js/dist/plugins.min.js'
            },
        },

        cssmin: {
            options: {
                report: 'gzip',
                keepSpecialComments: 1
            },
            target: {
                files: [{
                    expand: true,
                    cwd: 'css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'css/dist/',
                    ext: '.css'
                }]
            }
        },

        // htmlmin: {
        //   dist: {
        //     options: {
        //       collapseBooleanAttributes: true,
        //       collapseWhitespace: true,
        //       conservativeCollapse: true,
        //       removeAttributeQuotes: true,
        //       removeCommentsFromCDATA: true,
        //       removeEmptyAttributes: true,
        //       removeOptionalTags: true,
        //       removeRedundantAttributes: true,
        //       useShortDoctype: true
        //     },
        //     files: [{
        //       expand: true,
        //       cwd: '.',
        //       src: '{,*/}*.html',
        //       dest: '.'
        //     }]
        //   }
        // },

        watch: {
            options: {
                livereload: true,
            },

            grunt: {
                files: ['Gruntfile.js'],
                options: {
                    reload: true
                }
            },

            kit: {
                files: ['**/*.kit'],
                tasks: ['codekit', 'growl'],
            },

            html: {
                files: [
                    '**/*.html',
                    '!bower_components/**/*.html',
                    '!node_modules/**/*.html',
                ],
                options: {
                    livereload: true
                }
            },

            jsApp: {
                files: [
                    'js/app.js',
                    'js/app*.js',
                ],
                tasks: ['concat:app'],
            },

            jsPlugins: {
                files: [
                    'js/plugins/*.js',
                    'js/modules/*.js',
                ],
                tasks: ['concat:plugins'],
            },

            sass: {
                files: ['scss/**/*.scss'],
                tasks: ['sass' /*'autoprefixer',*/ /*'growl'*/],
                options: {
                    livereload: false,
                    debounceDelay: 50
                }
            },

            livereload: {
                files: [
                    'css/*.css',
                    'js/app.min.js',
                    './*.html'
                ],
                options: {
                    livereload: true,
                    spawn: false,
                    nospawn: true
                }
            }

        },

    });

    grunt.loadNpmTasks('grunt-growl');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-codekit');
    grunt.loadNpmTasks('grunt-webfont');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('build', ['codekit', 'copy', 'webfont', 'sass', 'concat']);
    grunt.registerTask('default', ['build', 'express', 'watch']);
    grunt.registerTask('serve', ['express', 'watch']);
    grunt.registerTask('dist', ['build', 'uglify', 'autoprefixer', 'cssmin']);
};
