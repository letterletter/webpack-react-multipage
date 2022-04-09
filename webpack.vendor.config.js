// 动态链接库配置文件
const path = require('path');
const webpack = require('webpack');
const dllAssetPath = path.join(__dirname, 'dll');
const dllLibraryName = 'dllExample';

module.exports = {
  entry: ['react'],
  output: {
    path: dllAssetPath,
    filename: 'vendor.js',
    library: dllLibraryName
  },
  plugins: [
    new webpack.DllPlugin({
      name: dllLibraryName, // 导出的dll library的名字，与output.library对应
      path: path.join(dllAssetPath, "manifest.json"), // 资源清单的绝对路径
    })
  ]
}