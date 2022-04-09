const loadUtils = require('loader-utils');
var SourceNode = require('source-map').SourceNode;
var SourceMapConsumer = require('source-map').SourceMapConsumer;
module.exports = function(content, sourceMap) {
  
  var useStrictPrefix = '\'use  strict \';\n\n';
  if(this.cacheable) { // 启用缓存
    this,cacheable()
  }
  // sourcemap
  var options = loadUtils.getOptions(this) || {};
  console.log(options)
  // if(options.sourceMap && sourceMap) {
  //   var currentRequest = loadUtils.getCurrentRequest(this);
  //   var node = SourceNode.fromStringWithSourceMap(
  //     content,
  //     new SourceMapConsumer(sourceMap)
  //   );
  //   node.prepend(useStrictPrefix);
  //   var result = node.toStringWithSourceMap({ file: currentRequest });
  //   // 
  //   var callback = this.async();
  //   callback(null, result.code, result.map.toJSON())
  // }
  //不支持source-map情况
  return useStrictPrefix + content;
}