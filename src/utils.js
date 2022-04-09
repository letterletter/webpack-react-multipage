//将日期转化为 **年**月**日 星期* hh:mm：ss格式

const toWeekDay = { 0: '星期日', 1: '星期一', 2: '星期二', 3: '星期三', 4: '星期四', 5: '星期五', 6: '星期六' };
function formatToChinese(date) {
  // let date = new Date();
  console.log(date, 'date');
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  let day = date.getDate();
  day = day < 10 ? '0' + day : day;
  const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  let minutes = date.getMinutes();
  minutes = minutes < 10 ? '0' + minutes : minutes;
  let seconds = date.getSeconds();
  seconds = seconds < 10 ? '0' + seconds : seconds;
  const week = toWeekDay[date.getDay()];
  return year + '年' + month + '月' + day + '日' + '   ' + week + '  ' + hours + ':' + minutes + ':' + seconds;
}

function tt() {
  return 'aaa';
}

export { formatToChinese };