$(document).pjax("a[target!=_blank]", "#Joe", {
	scrollTo: $("#Joe").offsetTop - 60,
	fragment: "#Joe",
	timeout: 5000,
});

NProgress.configure({
	showSpinner: true,
	easing: "ease-out",
	speed: 1000,
});

// pjax开始
$(document).on("pjax:send", function () {
	NProgress.start();

	// === 统一资源清理 ===

	// 1. 清理 tocbot
	if ($("#js-toc").length) tocbot.destroy();

	// 2. 清理 commonContext 事件和定时器
	if (window.commonContext && typeof window.commonContext.destroy === 'function') {
		window.commonContext.destroy();
	}

	// 3. 清理 EvanBigBanner 定时器
	if (window._evanBigBannerInstance && typeof window._evanBigBannerInstance.destroy === 'function') {
		window._evanBigBannerInstance.destroy();
		window._evanBigBannerInstance = null;
	}

	// 4. 清理大图滚动监听
	if (typeof window._cleanupBigBannerScroll === 'function') {
		window._cleanupBigBannerScroll();
		window._cleanupBigBannerScroll = null;
	}

	// 5. 恢复被覆盖的 fetch
	if (window._commentWidgetPluginFetch) {
		window.fetch = window._commentWidgetPluginFetch;
		delete window._commentWidgetPluginFetch;
	}

	// 6. 清理 joe-read-limited 组件定时器
	document.querySelectorAll('joe-read-limited').forEach(function (el) {
		if (el.checkTimer) {
			clearInterval(el.checkTimer);
			el.checkTimer = null;
		}
	});

	// === 清理结束 ===

	$("html, body").animate(
		{
			scrollTop: $("#Joe").position().top - 60,
		},
		500
	);
});

// pjax结束
$(document).on("pjax:complete", function () {
	NProgress.done();
	$("script[data-pjax]").each(function () {
		$(this).parent().append($(this).remove());
	});
});
