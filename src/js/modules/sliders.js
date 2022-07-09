import Swiper, { Navigation, Pagination, EffectFade, Autoplay } from 'swiper';

const sliders = () => {
    const swiper = new Swiper('.swiper', {
        modules: [Navigation, Pagination, EffectFade, Autoplay],
        loop: true,
    });
}

export default sliders;
