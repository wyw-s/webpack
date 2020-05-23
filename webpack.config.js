// 导入path 模块
const path = require("path")

module.exports = {
  entry: "./main.js",
  output: {
    // 将所有依赖的模块合并输出到一个bundle.js文件；
    filename: 'bundle.js',
    // 将输出文件都放在dist目录下；
    path: path.resolve(__dirname, './dist')
  }
}