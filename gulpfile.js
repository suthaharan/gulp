var gulp = require('gulp'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload'),
    lr = require('tiny-lr'),
    server = lr();
var browserSync = require('browser-sync').create();

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

// Below 'js' is the name of the task and the final scripts
gulp.task('html', function(done) {
    gulp.src(['js/script.js', './*.html']).pipe(browserSync.reload({
        stream: true
    }));
    done();
});

// Watch jsSources and if one of the file changes then execute javascript tasks 'js', 'watch' in order
gulp.task('watch', function() {
    gulp.watch(jsSources, gulp.series(gulp.parallel('js')));
    gulp.watch(['js/script.js', './*.html'], gulp.series(gulp.parallel('html')));
});

// Default task that runs automatically - a series of task
gulp.task('default', gulp.series(gulp.parallel('browserSync', 'js', 'watch'), function() {
    // do something

}));