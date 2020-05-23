// 导入path 模块
const path = require("path")

module.exports = {
  entry: "./main.js",
  output: {
    // 将所有依赖的模块合并输出到一个bundle.js文件；
    filename: 'bundle.js',
    // 将输出文件都放在dist目录下；
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        /**
         * 由于webpack将一切看作模块，所以css也不列外，但是原生webpack
         * 并不支持解析css文件,所以需要第三方插件。
         * 解析顺序为从后往前，既先使用css-loader解析,在使用 style-loader 把生成的
         * js插入到head头部的<style></style>中
         */
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}