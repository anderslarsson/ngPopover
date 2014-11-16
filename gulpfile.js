var gulp 	= require('gulp');
var stylus 	= require('gulp-stylus');
var bump	= require('gulp-bump');
var uglify 	= require('gulp-uglify');
var rename 	= require('gulp-rename');

gulp.task('styles', function() {
	gulp.src('css/ngPopover.styl')
		.pipe(stylus({}))
		.pipe(gulp.dest('css'));
});

gulp.task('minify', function() {
	gulp.src('js/ngPopover.js')
		.pipe(uglify())
		.pipe(rename('ngPopover.min.js'))
		.pipe(gulp.dest('js'));
});


var bumpIt = function(type) {
	gulp.src('./bower.json')
		.pipe(bump({type: type}))
		.pipe(gulp.dest('./'));
}

// gulp.task('bump-minor', bumpIt('minor'));
// gulp.task('bump-patch', bumpIt('patch'));
// gulp.task('bump-major', bumpIt('major'));


gulp.task('default', ['styles', 'minify']);