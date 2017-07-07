var gulp = require('gulp'),
    wiredep = require('wiredep').stream,
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    sftp = require('gulp-sftp'),
    clean = require('gulp-clean');

//SFTP
//gulp.task('sftp', function () {
//    return gulp.src('dist/**/*')
//        .pipe(sftp({
//            host: 'website.com',
//            user: 'johndoe',
//           pass: '1234'
//        }));
//});

//clean
gulp.task('clean', function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

//build
gulp.task('build', ['clean'], function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('dist'));
});

//bower
gulp.task('bower', function () {
    gulp.src('./app/index.html')
        .pipe(wiredep({
            directory : "app/bower_components"
        }))
        .pipe(gulp.dest('./app'));
});

gulp.task('watch', function () {
    gulp.watch('bower.json', ['bower'])
});