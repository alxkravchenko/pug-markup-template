import gulp from 'gulp';
import config from './gulp/config.js';
import clean from './gulp/tasks/clean.js';
import server from './gulp/tasks/server.js';
import { scriptsBuild, scriptsWatch, vendorBuild, vendorWatch } from './gulp/tasks/scripts.js';
import { pugBuild, pugWatch } from './gulp/tasks/pug.js';
import { sassBuild, sassWatch } from './gulp/tasks/styles.js';
import { assetsBuild, assetsWatch } from './gulp/tasks/assets.js';
import { imagesBuild, imagesWatch } from './gulp/tasks/images.js';
import { spritesBuild, spritesWatch } from './gulp/tasks/svgSprite.js';
import { refreshCache, rewrite } from './gulp/tasks/cache.js';
import zipFiles from './gulp/tasks/zip.js';

config.setEnv();

export const build = gulp.series(
    clean,
    gulp.parallel(
        scriptsBuild,
        vendorBuild,
        pugBuild,
        sassBuild,
        assetsBuild,
        imagesBuild,
        spritesBuild,
    ),
);

export const watch = gulp.series(
    build,
    server,
    gulp.parallel(
        scriptsWatch,
        vendorWatch,
        pugWatch,
        sassWatch,
        assetsWatch,
        imagesWatch,
        spritesWatch,
    ),
);

export const cache = gulp.series(
    refreshCache,
    rewrite
)

export const zip = zipFiles;
