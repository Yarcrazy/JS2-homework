"use strict";

var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('concatcss', function() {
  return gulp.src('src/**/*.css')
    .pipe(concat('style.css'))
    .pipe(gulp.dest('distr'));
});
gulp.task('concatjs', function() {
  return gulp.src('src/**/*.js')
    .pipe(concat('script.js'))
    .pipe(gulp.dest('distr'));
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.css', ['concatcss']);
  gulp.watch('src/**/*.js', ['concatjs']);
});