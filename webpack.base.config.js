
const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');
const TerserPlugin = require('terser-webpack-plugin'); // 压缩资源js
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HappyPack = require('happypack');
const { webpack, IgnorePlugin, DllReferencePlugin } = require('webpack');
const Analyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
  mode: 'development', //打包为开发模式
  // 入口配置的对象中，属性为输出的js文件名，属性值为入口文件
  entry: {
    page1: './src/page1/index.js',
    page2: './src/page2/index.js',
  }, //入口文件,从项目根目录指定
  output: { //输出路径和文件名，使用path模块resolve方法将输出路径解析为绝对路径
    path: path.resolve(__dirname, './dist'), //将js文件打包到dist/js的目录
    filename: '[name]@[chunkhash].js'
    // filename: "[name]/[name].[hash].bundle.js" //使用[name]打包出来的js文件会分别按照入口文件配置的属性来命名
  },
  module: {
    noParse(fullpath) {  //会忽略解析，但会打包到资源文件中
      return /utils/.test(fullpath);
    },
    rules: [
      {
        test: /\.css$/,//一个匹配loaders所处理的文件的拓展名的正则表达式，这里用来匹配js和jsx文件（必须）
        exclude: /node_modules/,//屏蔽不需要处理的文件（文件夹）（可选）
        use:
          [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true, //开启css module
              }
            }
          ],
      },
      {
        test: /\.(js|jsx)$/,//一个匹配loaders所处理的文件的拓展名的正则表达式，这里用来匹配js和jsx文件（必须）
        exclude: /node_modules/,//屏蔽不需要处理的文件（文件夹）（可选）
        loader: 'babel-loader',//loader的名称（必须）
        options: {
          presets: ['@babel/preset-react', '@babel/preset-env'],
          plugins: ['@babel/plugin-transform-runtime', 'syntax-dynamic-import']
        }
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader', // 编译 Less -> CSS
          },
        ],
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000, // url-loader 包含file-loader，这里不用file-loader, 小于10000B的图片base64的方式引入，大于10000B的图片以路径的方式导入
          name: 'static/img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000, // 小于10000B的图片base64的方式引入，大于10000B的图片以路径的方式导入
          name: 'static/fonts/[name].[hash:7].[ext]'
        }
      }
    ],
  },
  plugins: [
    new Analyzer(),
    new HappyPack({
      id: 'js',
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['react']
          }
        }
      ]
    }),
    // 排除一些用不到的模块
    new IgnorePlugin({
      resourceRegExp: /^\.\/locale$/, // 匹配资源文件
      contextRegExp: /moment$/, // 匹配检索目录
    }),
    new DllReferencePlugin({
      manifest: require(path.join(__dirname, 'dll/manifest.json'))
    }),
    new HtmlWebpackPlugin(
      {
        template: './src/page1/index.html',
        inject: true,
        chunks: ['page1'],
        filename: resolve('./dist/page1/index.html'),
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true,
        }
      }
    ),
    new HtmlWebpackPlugin(
      {
        template: './src/page2/index.html',
        inject: true,

        chunks: ['page2'],
        filename: resolve('./dist/page2/index.html'),
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true,
        }
      }
    ),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    minimize: true,
    minimizer: [
      new OptimizeCssAssetsPlugin({
        //生效范围，只压缩匹配到的资源
        assetNameRegExp: /\.optimize\.css$/g,
        cssProcessor: require('cssnano'), // 压缩处理器
        cssProcessorOptions: { discardComments: { removeAll: true } },
        cssPrint: true, // 是否展示Log
      }),
      // new TerserPlugin({
      //   test: /\.js(\?.*)?$/i,
      //   exclude: /\/excludes/,
      // })
    ]
  },
  devServer: {
    open: true,
    contentBase: path.join(__dirname, './dist'),
    historyApiFallback: true, // 不跳转
    inline: true, // 实时刷新
    hot: true, // 开启热更新
    port: 8000,
    publicPath: '/dist', // 间接资源的位置需要通过publicPath指定
  }
};