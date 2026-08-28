import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import { readdirSync } from "fs";
import { dirname, join as joinPath, resolve as resolvePath } from "path";
import { fileURLToPath } from "url";
import postcss from "rollup-plugin-postcss";

const rootDir = dirname(fileURLToPath(import.meta.url));
const jsRootDir = resolvePath(rootDir, "templates", "assets", "js");
const lessRootDir = resolvePath(rootDir, "templates", "assets", "css");
const jsFiles = readdirSync(jsRootDir).filter((file) => file.endsWith(".js"));
const lessFiles = readdirSync(lessRootDir).filter((file) =>
  file.endsWith(".less")
);

// 第三方精简产物：从 npm 包按需 tree-shake 打包，替代体积臃肿的官方 bundle。
// 入口放在 js/vendor/ 下（不参与上面的 js/*.js 目录扫描），产物直接覆盖 lib/ 内对应文件。
const vendorConfig = [
  {
    input: resolvePath(jsRootDir, "vendor", "swiper-entry.js"),
    output: {
      file: resolvePath(
        rootDir,
        "templates",
        "assets",
        "lib",
        "swiper",
        "swiper-bundle.min.js"
      ),
      format: "iife",
    },
    plugins: [resolve(), terser()],
    treeshake: true,
  },
];

const jsConfig = jsFiles.map((file) => ({
  input: joinPath(jsRootDir, file),
  output: {
    file: joinPath(jsRootDir, "min", file.replace(".js", ".min.js")),
    format: "iife",
  },
  plugins: [resolve(), terser()],
  treeshake: true,
}));

const lessConfig = lessFiles.map((file) => ({
  input: joinPath(lessRootDir, file),
  output: {
    file: joinPath(lessRootDir, "min", file.replace(".less", ".min.css")),
  },
  plugins: [
    postcss({
      extract: true,
      minimize: true,
      extensions: [".less"],
      use: [["less", { javascriptEnabled: true }]],
    }),
  ],
}));

export default [...vendorConfig, ...jsConfig, ...lessConfig];
