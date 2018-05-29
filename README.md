
## STEP 1
Setup folder and file structure

    # coffeescript
        * src
            - coffee
                -- script.coffee
            - lib
            - sass
                -- main.scss
            - scripts
                -- logic1.js
                -- logic2.js
        * css
        * js
        * index.html

## STEP 2
Setting up nodejs with required packages

$ cd coffeescript

$ npm init

$ npm install --save-dev gulp gulp-util gulp-coffee gulp-concat gulp-sass gulp-uglify gulp-livereload tiny-lr

If you want to upgrade npm,
$ npm i npm@latest -g

If there are errors / packages deprecated, it will list them
$ npm install --save-dev vinyl replace-ext ansi-colors date-format fancy-log lodash.template minimist beeper through2 multipipe list-stream plugin-error

To audit vulnerable libraries, 
$ npm audit

To fix audited packages automatically if possible
$ npm audit fix

## STEP 3
Setting up Gulp workflow

$ touch gulpfile.js

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

// You can use wildcard characters to include all files in a specific folder
// To have control over which file is to be compiled first and which to be next, include files in an array
var jsSources = ['src/scripts/logic1.js',
    'src/scripts/logic2.js'
];

// Below 'js' is the name of the task and the final scripts
gulp.task('js', function() {
    gulp.src(jsSources)
        .pipe(uglify())
        .pipe(concat('script.js'))
        .pipe(gulp.dest('js'));
});

Save the file

$ gulp js

** Note: Had issues with gulp, gulp-cli not being recognized globally. Had to install these packages globally in order to execute this command.

You can now find script.js file under js/ folder.

## STEP 4
Setting up multiple tasks, streamline and live reload changes

Tasks have to be watched in parallel or in sync with recent addition to Gulp changes

$ gulp 

Gulp will continue to watch for any changes in jsSources folder and if any files in it are modified and saved, then it gets automatically saved under js/ folder


## STEP 5
Live reload changes to a server to reflect changes real time

$ npm install browser-sync --save-dev 

Using Browsersync to detect changes reload browser

## STEP 6
SASS Compiling
$ npm install -S gulp-ruby-sass

** In windows, you will have to setup Ruby and then install sass. If not, gulp will error out
$ gem install sass