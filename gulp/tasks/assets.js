import gulp from 'gulp';
import config from '../config.js';

const fontsBuild = () =>
	gulp.src(`${config.src.fonts}/**/*`)
		.pipe(gulp.dest(config.dest.fonts));

const resourcesBuild = () =>
	gulp.src(`${config.src.assets}/resources/**/*`)
		.pipe(gulp.dest(config.dest.root));

export const assetsBuild = gulp.parallel(fontsBuild, resourcesBuild);

export const assetsWatch = () => {
	gulp.watch(`${config.src.fonts}/**/*`, fontsBuild);
	gulp.watch(`${config.src.resources}/**/*`, resourcesBuild);
};
