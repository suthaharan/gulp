var gulp = require('gulp'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    sass = require('gulp-ruby-sass');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
// Set the browser that you want to support
const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
];

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: '.'
        },
    })
});

// You can use wildcard characters to include all files in a specific folder
// To have control over which file is to be compiled first and which to be next, include files in an array
var jsSources = ['src/scripts/logic1.js',
    'src/scripts/logic2.js'
];

// Now working with SASS files
var sassSources = ['src/sass/*.scss'];

// Below 'js' is the name of the task and the final scripts
gulp.task('js', function(done) {
    gulp.src(jsSources)
        .pipe(uglify())
        .pipe(concat('script.js'))
        .pipe(gulp.dest('js'))
        .pipe(browserSync.reload({
            stream: true
        }));
    done();
});

gulp.task('styles', function() {
    gulp.src(['src/css/*.css'])
        .pipe(autoprefixer({ browsers: AUTOPREFIXER_BROWSERS }))
        // Minify the file
        .pipe(csso())
        // Output
        .pipe(concat('style.css'))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Below 'js' is the name of the task and the final scripts
gulp.task('sass', function(done) {
    return sass(sassSources, {
            style: 'expanded',
            lineNumbers: true
        })
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }));

    done();
});

// Below 'js' is the name of the task and the final scripts
gulp.task('html', function(done) {
    gulp.src(['js/script.js', './*.html']).pipe(browserSync.reload({
        stream: true
    }));
    done();
});

// Gulp task to minify JavaScript files
gulp.task('scripts', function() {
    return gulp.src('src/scripts/vendor/*.js')
        // Minify the file
        .pipe(uglify())
        .pipe(concat('vendor.js'))
        // Output
        .pipe(gulp.dest('js'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Watch jsSources and if one of the file changes then execute javascript tasks 'js', 'watch' in order
gulp.task('watch', function() {
    gulp.watch(jsSources, gulp.series(gulp.parallel('js')));
    gulp.watch(sassSources, gulp.series(gulp.parallel('sass')));
    gulp.watch(['js/script.js', './*.html'], gulp.series(gulp.parallel('html')));
});

// Default task that runs automatically - a series of task
gulp.task('default', gulp.series(gulp.parallel('js', 'sass', 'styles', 'scripts', 'browserSync', 'watch'), function() {
    // do something

}));