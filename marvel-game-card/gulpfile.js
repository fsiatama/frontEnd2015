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

var watchify = require('watchify')
var assign = require('lodash.assign')
var livereload = require('gulp-livereload')

var opts = {
	entries: './lib/app.js',
	transform: [ babelify, jadeify ]
}

opts = assign({}, watchify.args, opts)

gulp.task('build', ['styl','js'])

gulp.task('js', function() {
	return generateBundle(browserify(opts))
})

gulp.task('styl', function() {
	return styl();
})

gulp.task('styl:livereload', function() {
	return styl().pipe( livereload( { start: true } ) )
})

gulp.task('styl:watch', function() {
	return gulp.watch( [ './lib/app.styl', './lib/**/*.styl' ], ['styl:livereload'] )
})

gulp.task('js:watch', function() {
	var w = watchify( browserify(opts) )
	
	w.on('update', function(file) {
		//logica de rebuild
		console.log(file)
		var bdle = generateBundle(w).pipe( livereload() )
		console.log('finish')
		return bdle
	})
	
	return generateBundle(w).pipe( livereload({ start: true}) )
})

gulp.task( 'watch', ['styl:watch', 'js:watch'])

function styl () {
	return gulp.src('./lib/app.styl')
	.pipe(stylus({ use: nib() }))
	.pipe(concat('app.css'))
	.pipe(minify())
	.pipe(gulp.dest('./public/css'))
}

function generateBundle (b) {
	return b
	.bundle()
	.pipe(source('app.js'))
	.pipe(buffer())
	.pipe(uglify())
	.pipe(gulp.dest('./public/util/'))
}
