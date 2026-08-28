/**
 * Swiper 精简入口：只打包本主题实际用到的模块，替代 143KB 的 swiper-bundle。
 *
 * 保留依据（index.js 的 initSwiper + settings.yaml 的可配置项）：
 * - Pagination / Navigation：initSwiper 固定传入 .swiper-pagination 与前后翻页按钮
 * - Autoplay：受 enable_banner_autoplay / banner_delay 控制
 * - EffectFade/Cube/Coverflow/Flip/Cards/Creative：settings.yaml 的 banner_effect
 *   开放全部 7 种切换效果给站长选择，缺一种就会导致对应配置失效
 *
 * 未打包（主题从不启用）：virtual / zoom / controller / a11y / history /
 * hashNavigation / thumbs / grid / scrollbar / parallax / freeMode / lazy /
 * manipulation / keyboard / mousewheel（后两者在 initSwiper 中显式 false）
 *
 * 产物挂到 window.Swiper，保持与原 bundle 相同的全局调用方式。
 */
import Swiper, {
	Autoplay,
	EffectCards,
	EffectCoverflow,
	EffectCreative,
	EffectCube,
	EffectFade,
	EffectFlip,
	Navigation,
	Pagination,
} from "swiper";

Swiper.use([
	Navigation,
	Pagination,
	Autoplay,
	EffectFade,
	EffectCube,
	EffectCoverflow,
	EffectFlip,
	EffectCards,
	EffectCreative,
]);

window.Swiper = Swiper;
