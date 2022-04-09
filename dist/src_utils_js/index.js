"use strict";
(self["webpackChunkwpstudy"] = self["webpackChunkwpstudy"] || []).push([["src_utils_js"],{

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "formatToChinese": () => (/* binding */ formatToChinese)
/* harmony export */ });
'use  strict '; //将日期转化为 **年**月**日 星期* hh:mm：ss格式

var toWeekDay = {
  0: '星期日',
  1: '星期一',
  2: '星期二',
  3: '星期三',
  4: '星期四',
  5: '星期五',
  6: '星期六'
};

function formatToChinese(date) {
  // let date = new Date();
  console.log(date, 'date');
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  day = day < 10 ? '0' + day : day;
  var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  var minutes = date.getMinutes();
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var seconds = date.getSeconds();
  seconds = seconds < 10 ? '0' + seconds : seconds;
  var week = toWeekDay[date.getDay()];
  return year + '年' + month + '月' + day + '日' + '   ' + week + '  ' + hours + ':' + minutes + ':' + seconds;
}

function tt() {
  return 'aaa';
}



/***/ })

}]);
//# sourceMappingURL=index.js.map