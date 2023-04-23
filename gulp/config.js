import path from 'path';

const rootFolder = path.basename(path.resolve());
const srcPath = 'src';
const destPath = 'dist';

const config = {
	src: {
		root: srcPath,
		sass: `${srcPath}/scss`,
		js: `${srcPath}/js`,
		pug: `${srcPath}/pug`,
		images: `${srcPath}/assets/images`,
		fonts: `${srcPath}/assets/fonts`,
		assets: `${srcPath}/assets`,
		resources: `${srcPath}/assets/resources`,
	},

	dest: {
		root: destPath,
		css: `${destPath}/assets/css`,
		js: `${destPath}/assets/js`,
		images: `${destPath}/assets/images`,
		fonts: `${destPath}/assets/fonts`,
	},

	rootFolder: rootFolder,

	setEnv() {
		this.isProd = process.argv.includes('--prod');
		this.isDev = !this.isProd;
	},
};

export default config;
