import del from 'del';
import config from '../config.js';

const clean = () => del(config.dest.root);

export default clean;
