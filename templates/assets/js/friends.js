/**朋友圈逻辑 */
const friendContext = {
	/* 移除加载动画 */
	initEffect() {
		$(".joe_loading").remove();
		$(".joe_friends__list").removeClass("hidden");
	}
};

!(function () {
	document.addEventListener("DOMContentLoaded", function () {
		friendContext.initEffect();
	});
})();

