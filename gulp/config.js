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
        resources: `${srcPath}/assets/resources`
    },

    dest: {
        root: destPath,
        css: `${destPath}/static/css`,
        js: `${destPath}/static/js`,
        images: `${destPath}/static/images`,
        fonts: `${destPath}/static/fonts`,
    },

    rootFolder: rootFolder,

    setEnv() {
        this.isProd = process.argv.includes('--prod');
        this.isDev = !this.isProd;
    },
};

export default config;
