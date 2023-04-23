import gulp from 'gulp';
import plumber from 'gulp-plumber';
import gulpZip from 'gulp-zip';
import config from '../config.js';

const zipFiles = (done) => (
	gulp.src(`${config.dest.root}/**/*`)
		.pipe(plumber())
		.pipe(gulpZip(`${config.rootFolder}.zip`))
		.pipe(gulp.dest('./'))
);

export default zipFiles;
