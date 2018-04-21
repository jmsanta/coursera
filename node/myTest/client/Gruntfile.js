// You need to create a wrapper function,
// which encapsulates the configurations for your Grunt.
// https://www.tutorialspoint.com/grunt/grunt_sample_file.htm
// https://gruntjs.com/getting-started
module.exports = function(grunt) {
//grunt.initConfig({});
// Initialize your configuration object
grunt.initConfig({
  //  read the project settings from the package.json file into the pkg property.
  //It enables us to refer to the properties values within yourpackage.json file.
    pkg: grunt.file.readJSON('package.json'),
    //  task concat to concatenate all the files that are present
    // in the js/ folder and store the concatenated .js file under the dist/ folder.
    concat: {
       options: {
          separator: ';'
       },
       dist: {
          src: ['js/**/*.js'],
          dest: 'dist/<%= pkg.name %>.js'
       }
    },
     // let us create another task called uglify to minify our JavaScript.
    uglify: {
       options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today() %> */\n'
       },
       dist: {
          files: {
             'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
          }
       }
    },
    // watch task which looks for changes in any of the specified
    // files and runs the tasks you specify.
    watch: {
       files: ['js/**/*.js'],
       tasks: ['concat']
    }
 });
// load modules
     grunt.loadNpmTasks('grunt-contrib-uglify');
     grunt.loadNpmTasks('grunt-contrib-watch');
     grunt.loadNpmTasks('grunt-contrib-concat');
     // register tasks
     grunt.registerTask('default', ['concat', 'uglify']);

};
