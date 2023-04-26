import gulp from 'gulp';
import changed from 'gulp-changed';
import gulpif from 'gulp-if';
import rename from 'gulp-rename';
import imagemin from 'gulp-imagemin';
import imageminPngquant from 'imagemin-pngquant';
import imageminWebp from 'imagemin-webp';
import config from '../config.js';

const copyImages = () => (
	gulp.src([`${config.src.images}/**/*.{gif,png,jpg,jpeg,svg,webp}`, `!${config.src.images}/sprite/**/*`])
		.pipe(changed(config.dest.images))
		.pipe(gulpif(config.isProd, imagemin([
			imagemin.gifsicle({ interlaced: true }),
			imagemin.mozjpeg({ quality: 85 }),
			imageminPngquant({ quality: [0.8, 0.9] }),
			imagemin.svgo({ plugins: [{ removeViewBox: true }, { cleanupIDs: false }] }),
		])))
		.pipe(gulp.dest(config.dest.images))
);

const convertToWebp = () => (
	gulp.src(`${config.src.images}/**/*.{png,jpg,jpeg}`)
		.pipe(changed(config.dest.images, { extension: '.webp' }))
		.pipe(imagemin([
			imageminWebp({ quality: 85 })
		]))
		.pipe(rename(function (path) {
			return {
				dirname: path.dirname,
				basename: path.basename + path.extname,
				extname: ".webp"
			};
		}))
		.pipe(gulp.dest(config.dest.images))
);

export const imagesBuild = gulp.series(copyImages, convertToWebp);

export const imagesWatch = () => gulp.watch([`${config.src.images}/**/*.{gif,png,jpg,jpeg,svg,webp}`, `!${config.src.images}/sprite/**/*`], { ignoreInitial: false }, imagesBuild);
