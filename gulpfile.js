var gulp 	 	 = require('gulp'),
	plumber 	 = require('gulp-plumber'),
	sass 		 = require('gulp-sass'),
	concat 		 = require('gulp-concat'),
	uglify		 = require('gulp-uglify'),
	cssmin		 = require('gulp-clean-css'),
	rename		 = require('gulp-rename'),
	del 		 = require('del'),
	browserSync  = require('browser-sync').create(),
	autoprefixer = require('gulp-autoprefixer');	

gulp.task('sass', function () {
	return gulp.src('app/sass/style.+(scss|sass)')
		   .pipe(plumber())
		   .pipe(sass())
		   .pipe(autoprefixer({
		   		browsers: ['last 3 versions'],
		   		cascade: false
		   }))
		   .pipe(cssmin())
		   .pipe(rename({suffix: '.min'}))
		   .pipe(gulp.dest('app/css'))
		   .pipe(browserSync.stream());
});

gulp.task('script', function () {
	return gulp.src('app/js/script.js')
		   .pipe(plumber())
		   .pipe(uglify())
		   .pipe(rename({suffix: '.min'}))
		   .pipe(gulp.dest('app/js'))
		   .pipe(browserSync.stream());
});

gulp.task('browser-sync', ['sass', 'script'], function () {
	browserSync.init({
		server: "./app",
		notify: false
	});

	gulp.watch('app/sass/**/*.+(scss|sass)', ['sass']);
	gulp.watch('app/js/**/*.js', ['script']);
	gulp.watch('app/*.html').on('change', browserSync.reload);
});

gulp.task('clean', function () {
	return del.sync('dist');
});

gulp.task('build', ['clean', 'sass', 'script'], function () {
	var buildCss = gulp.src(['app/css/*.css', '!app/css/style.css'])
					.pipe(gulp.dest('dist/css'));

	var buildJs = gulp.src(['app/js/*.js', '!app/js/script.js'])
					.pipe(gulp.dest('dist/js'));

	var buildHtml = gulp.src('app/**/*.html')
						.pipe(gulp.dest('dist'));
});

gulp.task('default', ['browser-sync']);