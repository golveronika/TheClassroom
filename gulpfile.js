const gulp = require('gulp');
const sass = require('gulp-sass');
const { watch } = require('gulp');

function styles() {
    return gulp.src('./src/app/sass/**/*.sass')
        .pipe(sass())
        .pipe(gulp.dest('./public'));
}

function watchFiles() {
    watch('./src/app/sass/**/*.sass', styles);
}

exports.styles = styles
exports.watchFiles = watchFiles
