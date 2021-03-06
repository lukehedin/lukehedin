// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var fileinclude = require('gulp-file-include'),
  gulp = require('gulp');
 
// Lint Task
gulp.task('lint', function() {
    return gulp.src('scripts/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

//File include (for @@includes)
gulp.task('fileinclude', function() {
    gulp.src(['html/*.html'])
      .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
      }))
      .pipe(gulp.dest('./'));
  });

// Compile Our Sass
//LH: We only compile the top level styles.scss file, it imports the rest
gulp.task('sass', function() {
    return gulp.src('styles/styles.scss')
        .pipe(sass())
        .pipe(gulp.dest('build/css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp
        .src('scripts/*.js')
        .pipe(gulp.dest('build'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('scripts/*.js', ['lint', 'scripts']);
    gulp.watch('styles/*.scss', ['sass']);
    gulp.watch('html/*.html', ['fileinclude']);
    gulp.watch('images/*.svg', ['fileinclude'])
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch', 'fileinclude']);