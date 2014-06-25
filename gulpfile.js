var gulp 	= require('gulp');
var stylus 	= require('gulp-stylus');
var bump	= require('gulp-bump');

gulp.task('styles', function() {
	gulp.src('css/ngPopover.styl')
		.pipe(stylus({}))
		.pipe(gulp.dest('css'));
});


var bumpIt = function(type) {
	gulp.src('./bower.json')
		.pipe(bump({type: type}))
		.pipe(gulp.dest('./'));
}

gulp.task('bump-minor', bumpIt('minor'));
gulp.task('bump-patch', bumpIt('patch'));
gulp.task('bump-major', bumpIt('major'));


gulp.task('default', ['styles']);