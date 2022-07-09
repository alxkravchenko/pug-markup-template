import gulp from 'gulp';
import plumber from 'gulp-plumber';
import gulpZip from 'gulp-zip';
import notify from 'gulp-notify';
import config from '../config.js';

const zipFiles = (done) => (
    gulp.src(`${config.dest.root}/**/*`)
        .pipe(plumber(
        notify.onError({
            title: "ZIP",
            message: "Error: <%= error.message %>"
        })
        ))
        .pipe(gulpZip(`${config.rootFolder}.zip`))
        .pipe(gulp.dest('./'))
);

export default zipFiles;
