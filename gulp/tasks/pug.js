import gulp from 'gulp';
import pug from 'gulp-pug';
import formatHtml from 'gulp-format-html';
import plumber from 'gulp-plumber';
import gulpif from 'gulp-if';
import { setup as emittySetup } from '@zoxon/emitty';
import config from '../config.js';

const emittyPug = emittySetup(`${config.src.pug}`, 'pug', {
	makeVinylFile: true,
});

global.pugWatch = false;
global.emittyChangedFile = {
	path: '',
	stats: null,
};

export const pugBuild = () =>
	gulp.src(`${config.src.pug}/pages/*.pug`)
		// gulp.src(`${config.src.pug}/pages/*.pug`, { read: false })
		.pipe(
			plumber(),
		)
		.pipe(
			gulpif(
				global.pugWatch,
				emittyPug.stream(
					global.emittyChangedFile.path,
					global.emittyChangedFile.stats,
				),
			),
		)
		.pipe(
			pug({
				pretty: true,
			}),
		)
		.pipe(gulpif(config.isProd, formatHtml({ indent_size: 2 })))
		.pipe(gulp.dest(config.dest.root));

export const pugWatch = () => {
	global.pugWatch = true;

	gulp
		.watch(`${config.src.pug}/**/*.pug`, pugBuild)
		.on('all', (event, filepath, stats) => {
			global.emittyChangedFile = {
				path: filepath,
				stats,
			};
		});
};
