
const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { resolve } = require('path');
const { DefinePlugin } = require('webpack');
const ENV = process.env.ENV;
const isProd = ENV === 'production';
module.exports = {
  mode: 'development', //打包为开发模式
  // 入口配置的对象中，属性为输出的js文件名，属性值为入口文件
  entry: {
    page1: './src/page1/index.js',
    page2: './src/page2/index.js',
    vendor: ['react', 'react-dom', 'react-router-dom']
  }, //入口文件,从项目根目录指定
  output: { //输出路径和文件名，使用path模块resolve方法将输出路径解析为绝对路径
    path: path.resolve(__dirname, './dist'), //将js文件打包到dist/js的目录
    filename: isProd ? '[name]/[hash].js' : '[name]/index.js'
    // filename: '[name]@[chunkhash].js'
    // filename: "js/[name]-[hash].js" //使用[name]打包出来的js文件会分别按照入口文件配置的属性来命名
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,//一个匹配loaders所处理的文件的拓展名的正则表达式，这里用来匹配js和jsx文件（必须）
        exclude: /node_modules/,//屏蔽不需要处理的文件（文件夹）（可选）
        loader: 'babel-loader',//loader的名称（必须）
        options: {
          presets: ['@babel/preset-react', '@babel/preset-env'],
          plugins: ['@babel/plugin-transform-runtime', 'syntax-dynamic-import'],
          cacheDirectory: true,
        },
      },
      // {
      //   test:  /\.(js|jsx|ts|tsx)$/,
      //   enforce: 'pre',
      //   use: 'eslint-loader'
      // },
      {
        test: /\.js$/,
        use: {
          loader: 'force-strict-loader',   // 自定义loader
          options: {
            sourceMap: true
          }
        }
      },
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
          ],//loader的名称（必须）
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
        exclude: /node_modules/,
        // issuer配置加载者的条件限制
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
    new HtmlWebpackPlugin(
      {
        template: './src/page1/index.html',
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
        chunks: ['page2'],
        filename: resolve('./dist/page2/index.html'),
      }
    ),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    //添加多个环境变量
    new DefinePlugin({
      // ENV: JSON.stringify('production'),
      CONSTANTS: JSON.stringify({
        TYPES: ['foo', 'a', 'b']
      })
    })
  ]
};