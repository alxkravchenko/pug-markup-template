import gulp from 'gulp';
import svgSprite from 'gulp-svg-sprite';
import config from '../config.js';

const spriteSvg = () => (
	gulp.src(`${config.src.images}/sprite/**/*.svg`)
		.pipe(gulp.dest(`${config.dest.images}/sprite/svgicons`))
		.pipe(svgSprite({
			mode: {
					symbol: {
							sprite: '../sprite/sprite.svg',
					},
			},
			shape: {
				transform: [
					{
						svgo: {
							plugins: [
								{
									removeAttrs: {
										attrs: ['class', 'data-name', 'fill.*', 'stroke.*'],
									},
								},
							],
						},
					},
				],
			},
		}))
		.pipe(gulp.dest(`${config.dest.images}`))
);

export const spritesBuild = spriteSvg;

export const spritesWatch = () => {
	gulp.watch(`${config.src.images}/sprite/**/*.svg`, spritesBuild);
};
