/* 随机样式 */
let _index = 100;
const colors = [
	"#1b2152",
	"#2ea7e0",
	"#4b669a",
	"#31408d",
	"#59766f",
	"#756b80",
	"#8da1cc",
	"#87a79b",
	"#a090a3",
	"#537895",
	"#465efb",
	"#5961f9",
	"#4c83ff",
	"#6fa3ef",
	"#7e93be",
	"#5e5851",
	"#a79e92",
	"#5d6b8a",
	"#395886",
	"#3d6a91",
	"#487aa5",
	"#5b8fb9",
	"#6d86b3",
	"#5c7295",
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
