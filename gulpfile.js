var gulp = require('gulp');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var jade = require('gulp-jade');
var coffee = require('gulp-coffee');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
  browserSync({
    // open: false
    browser: "google chrome",
    ghostMode: false,
    server: {
      baseDir: "./"
      // routes: {"/url": "path"}
    }
  });
});

gulp.task('bs-reload', function() {
    browserSync.reload();
});

gulp.task('jade', function() {
    gulp.src(['src/jade/**/*.jade'])
        .pipe(plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(jade())
        .pipe(gulp.dest('./'))
        .pipe(browserSync.reload({
            stream: true
        }))
});
gulp.task('sass', function() {
    gulp.src(['src/sass/**/*.sass'])
        .pipe(plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(sass({
            sourceComments: 'normal',
            outputStyle: 'compressed'
        }))
        .pipe(autoprefixer('last 10 versions'))
        .pipe(gulp.dest('css/'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('coffee', function() {
    return gulp.src('src/coffee/**/*.coffee')
        .pipe(plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(coffee({bare: true }))
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        // .pipe(uglify())
        .pipe(gulp.dest('js/'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('default', ['browser-sync','jade','sass','coffee'], function() {
    gulp.watch("src/jade/**/*.jade", ['jade']);
    gulp.watch("src/sass/**/*.sass", ['sass']);
    gulp.watch("src/coffee/**/*.coffee", ['coffee']);
    gulp.watch("*.html", ['bs-reload']);
});