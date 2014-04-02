var gulp 	= require('gulp');
var stylus 	= require('gulp-stylus');

gulp.task('styles', function() {
	gulp.src('css/ngPopover.styl')
		.pipe(stylus({}))
		.pipe(gulp.dest('css'));
});

gulp.task('default', ['styles']);