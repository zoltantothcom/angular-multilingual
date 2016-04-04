'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        concat: {
            dist: {
                src: [
                    'bower_components/angular/angular.min.js',
                    'bower_components/angular-route/angular-route.min.js',
                    'bower_components/angular-gettext/dist/angular-gettext.min.js',
                    'js/*.js'
                ],
                dest: 'dist/js/<%= pkg.name %>-<%= pkg.version %>.js'
            }
        },

        uglify: {
            dist: {
                files: {
                    'dist/js/<%= pkg.name %>-<%= pkg.version %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },

        less: {
            "dist/css/<%= pkg.name %>.css": "css/*.less"
        },
        
        cssmin: {
            'dist/css/<%= pkg.name %>-<%= pkg.version %>.min.css': ['dist/css/<%= pkg.name %>.css']
        },

        nggettext_extract: {
            pot: {
                files: {
                    'po/index.template.pot': ['index.html'],
                    'po/home.template.pot': ['pages/home.html'],
                    'po/about.template.pot': ['pages/about.html'],
                    'po/contact.template.pot': ['pages/contact.html'],
                }
            },
        },

        nggettext_compile: {
            all: {
                options: {
                    format: "json"
                },
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: "po",
                        dest: "dist/lang",
                        src: ["*.po"],
                        ext: ".json"
                    }
                ]
            },
        },
        
        processhtml: {
            dist: {
                options: {
                    data: {
                        style: 'dist/css/<%= pkg.name %>-<%= pkg.version %>.min.css',
                        script: 'dist/js/<%= pkg.name %>-<%= pkg.version %>.min.js'
                    }
                },
                files: {
                    'dist/index.html': ['index.html']
                }
            }
        },

    });
    
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-angular-gettext');
    grunt.loadNpmTasks('grunt-processhtml');

    grunt.registerTask('default', [
        'nggettext_extract', 
        'nggettext_compile',
        'concat', 
        'uglify', 
        'less',
        'cssmin',
        'processhtml'
    ]);
};