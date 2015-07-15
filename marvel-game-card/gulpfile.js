var gulp = require('gulp')
var browserify = require('browserify')
var jadeify = require('jadeify')
var babelify = require('babelify')
var buffer = require('vinyl-buffer')
var source = require('vinyl-source-stream')
var stylus = require('gulp-stylus')
var concat = require('gulp-concat-css')
var nib = require('nib')
var minify = require('gulp-minify-css')
var uglify = require('gulp-uglify')

gulp.task('build', ['styl','js'])

gulp.task('js', function() {
	return browserify({
		entries: './lib/app.js',
		transform: [ babelify, jadeify ]
	})
	.bundle()
	.pipe(source('app.js'))
	.pipe(buffer())
	.pipe(uglify())
	.pipe(gulp.dest('./public/util/'))
})

gulp.task('styl', function() {
	return gulp.src('./lib/app.styl')
	.pipe(stylus({ use: nib() }))
	.pipe(concat('app.css'))
	.pipe(minify())
	.pipe(gulp.dest('./public/css'))
})
