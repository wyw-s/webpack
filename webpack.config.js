// 导入path 模块
const path = require('path')
// 提取css到单独的文件中；
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// css 代码压缩
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  // 设置webpack在寻找相对路径时以 context为 根目录进行查找
  context: path.resolve(__dirname, 'src'),
  // 若指定了 context 则入口文件会从指定的目录：src 中查找 main.js 文件；
  entry: './main.js',
  output: {
    // 将所有依赖的模块合并输出到一个[name].js文件
    // 若不指定静态的文件名则的默认的name为：main；
    filename: '[name]_[id]_[hash:8].js',
    // 将输出文件都放在dist目录下；
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        /**
         * 用正则表达式去匹配要用loader转换css文件
         * css-loader: 让我们以导入的方式加载css文件；
         * style-loader：创建style 标签，并把css放入进去
         */
        test: /\.css$/,
        /**
         * 由于webpack将一切看作模块，所以css也不列外，但是原生webpack
         * 并不支持解析css文件,所以需要第三方插件。
         * 解析顺序为从后往前，既先使用css-loader解析,在使用 style-loader 把生成的
         * js插入到head头部的<style></style>中
         */
        // use: ['style-loader', 'css-loader'],
        // 提取css到单独的文件中
        use: ExtractTextPlugin.extract({
          // 编译后用来提取css文件 用于当css没有被提取时
          fallback: 'style-loader',
          // 编译文件
          use: 'css-loader'
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name]_[id]_[contenthash:8].min.css'
      // filename: 'main.min.css'
    }),

    new OptimizeCssAssetsPlugin({
      // 匹配需要优化或者压缩的资源名
      assetNameRegExp: /\.css$/g,
      // 用于压缩和优化CSS 的处理器，默认是 cssnano 这是一个函数
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        // 设置预设值 并传递给 cssProcessor 用于删除所有的注释信息，
        preset: ['default', { discardComments: { removeAll: true } }]
      },
      // 表示插件能够在console中打印信息，默认值是true
      canPrint: true
    })
  ]
}
