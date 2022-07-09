import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import { createGulpEsbuild } from 'gulp-esbuild';
import config from '../config.js';

const esbuild = createGulpEsbuild({ incremental: config.isDev ? true : false })

export const scriptsBuild = () => (
    gulp.src(`${config.src.js}/*.js`)
        .pipe(plumber(notify.onError({
            title: "JS",
            message: "Error: <%= error.message %>"
        })))
        .pipe(esbuild({
            bundle: true,
            outdir: '',
            sourcemap: config.isDev ? true : false,
            minify: config.isDev ? false : true,
        }))
        .on('error', function (err) {
            console.error('ESBUILD ERROR', err);
            this.emit('end');
        })
        .pipe(gulp.dest(config.dest.js))
);

export const vendorBuild = () => (
    gulp.src(`${config.src.js}/vendor/*.js`)
        .pipe(gulp.dest(`${config.dest.js}/vendor`))
)

export const scriptsWatch = () => gulp.watch([`${config.src.js}/**/*.js`, `!${config.src.js}/vendor/*.js`, `!${config.src.js}/functions/*.js`], scriptsBuild);
export const vendorWatch = () => gulp.watch(`${config.src.js}/vendor/*.js`, vendorBuild);
