import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import gulpif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import plumber from 'gulp-plumber';
import postCss from 'gulp-postcss';
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';
import sassGlob from 'gulp-sass-glob';
import config from '../config.js';
const sass = gulpSass(dartSass);

export const sassBuild = () => (
	gulp.src(`${config.src.sass}/style.min.scss`)
		.pipe(plumber())
		.pipe(gulpif(config.isDev, sourcemaps.init()))
		.pipe(sassGlob())
		.pipe(sass({
				outputStyle: 'expanded',
				indentType: 'tab',
				indentWidth: 2,
				includePaths: ['./node_modules'],
		})).on('error', sass.logError)
		.pipe(gulpif(config.isDev, sourcemaps.write()))
		.pipe(gulpif(config.isProd, postCss([
			autoprefixer({ grid: 'autoplace' }),
			cssnano({ preset: ['default', { discardComments: { removeAll: true } }] })
		])))
		.pipe(gulp.dest(config.dest.css))
);

export const sassWatch = () => gulp.watch(`${config.src.sass}/**/*.scss`, sassBuild);
