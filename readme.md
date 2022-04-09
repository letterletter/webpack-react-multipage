## webpack5结合React配置多页面教程


---
#### output配置
```javascript
{
  entry: {
    app: './src/app.js',
    search: './src/search.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  }
}
```
filename决定每个输出bundle的名称，这些bundle会写入到ouput.path指定的目录下.其中可以指定hash长度[hash:16]或hashDigestLength全局配置长度。如果要配置客户端缓存，使用chunkhash,只于内容有关。        
path为绝对路径        
publicPath指定资源的输出位置，可以为CDN地址，"/"Host地址等。
变量名称|功能描述
:---:|---
[hash]|模块标识符的hash
[chunkhash]|chunk内容的hash
[name]|模块名称
[id]|模块标识符
[query]|模块的query,例如文件名?后面的字符串



#### loader
enforce用来指定一个Loader的种类，只接收"pre"或"post".webpack中loader按执行顺序分为pre,inline,normal,post.pre和post需要通过enforce指定。
##### 常用Loader介绍        

Loader名称|介绍|安装|模块介绍|  
:---:|---|:---|---
babel-loader|处理ES6+并将其编译为ES5|npm install babel-loader @babel/core @babel/preset-env|@babel/core为编译器核心模块，
ts-loader|处理typescript|npm install ts-loader typescript|ts的配置在Tsconfig.json中，ts-loader实现代码类型检查
html-loader|将html文件转化为字符串并进行格式化|npm install html-loader|可以把一个html片段通过js加载进来
handlebars-loader|处理handlebars模板|npm install handlebars-loader handlebars|  
file-loader|打包文件类型的资源返回publicPath|npm install file-loader|
url-loader|类似file-loader,可以设置文件大小的阙值|npm install url-loader|>阙值，返回publicPath,<阙值，返回文件base64形式的编码

#### 参考链接

[简书](https://www.jianshu.com/p/7896ab828dd6)        

[CSDN](https://blog.csdn.net/lunahaijiao/article/details/112343075?utm_medium=distribute.pc_relevant.  none-task-blog-2~default~baidujs_baidulandingword~default-0.pc_relevant_default&spm=1001.2101.3001.4242.1&utm_relevant_index=3)        

[WebPack官网](https://webpack.docschina.org/configuration/output/)        



#### 动态链接库
npm run dll 后，生成一个dll目录。生成了两个文件vendor.js和manifest.json。前者包含了库的代码，后者则是资源清单.

将vendor链接到业务代码        
使用与DllPlugin配套的插件DllReferencePlugin,它起到索引和链接的作用。在工程的webpack配置文件中通过DllReferencePlugin来获取打包好的资源清单
```
plugin: [
  new webpack.DllReferencePlugin({
    manifest: require(path.join(__dirname, 'dll/manifest.json'))
  })
]
```

#### webpack开发效率插件
 webpack-dashboard
安装npm install webpack-dashboard
在webpack配置中引入后，加入到plugins
```
const DashBoardPlugin = require('webpack-dashboard/plugin')
plugins: [
  new DashBoardPlugin()
]
```
webpack-merge插件
speed-measure-webpack-plugin
size-plugin