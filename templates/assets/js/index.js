/**首页逻辑 */
const homeContext = {
	/* 初始化轮播图 */
	initSwiper() {
		if (
			ThemeConfig.enable_banner &&
			$(".joe_index__banner .swiper").length !== 0
		) {

			new Swiper('.swiper', {
				direction: ThemeConfig.banner_direction, // 垂直切换选项
				loop: ThemeConfig.enable_banner_loop, // 循环模式选项
				effect: ThemeConfig.banner_effect,//Slide的切换效果
				keyboard: false,
				speed: ThemeConfig.banner_speed,
				mousewheel: false,
				grabCursor: ThemeConfig.enable_banner_handle,
				allowTouchMove: ThemeConfig.enable_banner_handle,
				autoplay: ThemeConfig.enable_banner_autoplay
					? {
						delay: ThemeConfig.banner_delay,
						disableOnInteraction: false,
					}
					: false,
				observer: true,
				// 如果需要分页器
				pagination: {
					el: '.swiper-pagination',
				},

				// 如果需要前进后退按钮
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},

			});
		}
	},
	/* 初始化首页列表 */
	loadMoreArticles() {
		if (!ThemeConfig.enable_index_list_ajax){
			return
		}
		// 在页面加载完成后执行
		const $headerHeight =
			ThemeConfig.enable_fixed_header || Joe.isMobile
				? $(".joe_header").height()
				: 0;
		$(document).ready(() => {
			const $domLoadContainer = $(".joe_load_container");
			$domLoadContainer.on('click','.joe_load', async function () {
				const lastItemTop = document.querySelector(".joe_list__item:last-child").offsetTop;
				const $domLoad = $(".joe_load");
				this.domNext = $domLoad.attr('data-next');
				// console.log(this.domNext)
				$domLoad.html("加载中...").attr("loading", "true");
				fetch(this.domNext, {
					method: "GET",
				})
					.then((response) => response.text())
					.then((html) => {
						const parser = new DOMParser();
						const doc = parser.parseFromString(html, "text/html");
						const postListElement = document.querySelector(".joe_list");
						// console.log(postListElement)
						const postListNewElements = doc.querySelectorAll(".joe_list .joe_list__item");
						// console.log(postListNewElements)

						if (postListNewElements && postListNewElements.length > 0) {
							postListNewElements.forEach((element) => {
								postListElement.appendChild(element.cloneNode(true));
							});

						}
						const $newDomLoad = $(doc).find(".joe_load");
						if ($newDomLoad.attr('data-next') !== '/') {
							$domLoadContainer.empty().append($newDomLoad);
						} else {
							$domLoadContainer.remove();
						}
						const scrollTop = lastItemTop - $headerHeight; // Adjust the value as needed
						window.scrollTo({
							top: scrollTop,
							behavior: 'smooth'
						});

					})
					.catch((error) => {
						console.error(error);
					})
					.finally(() => {

					});
			});
		});
	},

	bigBannerGoto(){
		if (!ThemeConfig.enable_big_banner){
			return
		}
		const link = document.getElementById('evan-big-banner_goto');
		const target = document.querySelector('#indexPosition');

		link.addEventListener('click', (event) => {
			event.preventDefault();

			const targetPosition = target.getBoundingClientRect().top + window.scrollY;

			window.scrollTo({
				top: targetPosition,
				behavior: 'smooth'
			});
		});
	},
};

!(function () {
	const omits = ["getThumbnail", "getDefaultThumbnail"];
	document.addEventListener("DOMContentLoaded", function () {
		Object.keys(homeContext).forEach(
			(c) => !omits.includes(c) && homeContext[c]()
		);
	});

})();
