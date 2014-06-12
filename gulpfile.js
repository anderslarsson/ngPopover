var gulp 	= require('gulp');
var stylus 	= require('gulp-stylus');
var bump	= require('gulp-bump');

gulp.task('styles', function() {
	gulp.src('css/ngPopover.styl')
		.pipe(stylus({}))
		.pipe(gulp.dest('css'));
});


gulp.task('bump-minor', function() {
	gulp.src('./bower.json')
		.pipe(bump({type:'minor'}))
		.pipe(gulp.dest('./'));
});


gulp.task('bump-patch', function() {
	gulp.src('./bower.json')
		.pipe(bump({type:'patch'}))
		.pipe(gulp.dest('./'));
});


gulp.task('default', ['styles']);