import Swiper, { Navigation, Pagination, EffectFade, Autoplay } from 'swiper';

const hero = () => {
	const swiper = new Swiper('.swiper', {
		modules: [Navigation, Pagination, EffectFade, Autoplay],
		loop: true,
	});
};

export default hero;
