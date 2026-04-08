/* 随机样式 */
let _index = 100;
const colors = [
	"#1b2152",
	"#2ea7e0",
	"#4b669a",
	"#59766f",
	"#756b80",
	"#955f6d",
	"#1d2088",
	"#171614",
	"#5e5851",
	"#d6cfc4",
	"#31408d",
	"#8da1cc",
	"#87a79b",
	"#a090a3",
	"#c28a98",
	"#58b8e6",
]; // 定义你的颜色数组
const random = (min, max) =>
	Math.floor(Math.random() * (max - min + 1)) + min;
const $el = $(".joe_leaving-list");
const maxWidth = $el.width();
const maxHeight = $el.height();
const radius1 = [
	"20px 300px",
	"20px 400px",
	"20px 500px",
	"30px 300px",
	"30px 400px",
	"30px 500px",
	"40px 300px",
	"40px 400px",
	"40px 500px",
];
const radius2 = [
	"300px 20px",
	"400px 20px",
	"500px 20px",
	"300px 30px",
	"400px 30px",
	"500px 30px",
	"300px 40px",
	"400px 40px",
	"500px 40px",
];
$(".joe_leaving-list .item").each((index, item) => {
	const zIndex = random(1, 99);
	const background = colors[random(0, colors.length - 1)];
	const width = Math.ceil($(item).width());
	const height = Math.ceil($(item).height());
	const top = random(0, maxHeight - height);
	const left = random(0, maxWidth - width);
	$(item).css({
		display: "block",
		zIndex,
		background,
		top,
		left,
		borderTopLeftRadius: radius2[random(0, radius2.length - 1)],
		borderTopRightRadius: radius1[random(0, radius1.length - 1)],
		borderBottomLeftRadius: radius1[random(0, radius1.length - 1)],
		borderBottomRightRadius: radius1[random(0, radius1.length - 1)],
	});
	$(item).draggabilly({ containment: true });
	$(item).on("dragStart", (e) => {
		_index++;
		$(item).css({ zIndex: _index });
	});
});
