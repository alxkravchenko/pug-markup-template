import Swiper from 'swiper';
import { Navigation, Pagination, EffectFade, Autoplay } from 'swiper/modules';

const hero = () => {
	const swiper = new Swiper('.swiper', {
		modules: [Navigation, Pagination, EffectFade, Autoplay],
		loop: true,
	});
};

export default hero;
