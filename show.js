// 操作DOM元素将content显示到网页上；
function show(content) {
  window.document.getElementById('app').innerText = 'hello' + content
}
module.exports = show;
