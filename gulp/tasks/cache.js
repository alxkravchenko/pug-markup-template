import gulp from 'gulp';
import rev from 'gulp-rev';
import revDel from 'gulp-rev-delete-original';
import revRewrite from 'gulp-rev-rewrite';
import { readFileSync } from 'fs';
import config from '../config.js';

export const refreshCache = () => (
	gulp.src(`${config.dest.root}/**/*.{css,js}`, {
		base: config.dest.root
	})
		.pipe(rev())
		.pipe(revDel())
		.pipe(gulp.dest(config.dest.root))
		.pipe(rev.manifest('rev.json'))
		.pipe(gulp.dest(config.dest.root))
);

export const rewrite = () => {
	const manifest = readFileSync(`${config.dest.root}/rev.json`);
	gulp.src(`${config.dest.css}/*.css`)
		.pipe(revRewrite({
			manifest
		}))
		.pipe(gulp.dest(`${config.dest.css}`))
	return gulp.src(`${config.dest.root}/**/*.html`)
		.pipe(revRewrite({
			manifest
		}))
		.pipe(gulp.dest(`${config.dest.root}`))
};
