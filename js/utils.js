// 获取第一个元素子节点
function getFirstChild(dom){
  if (dom.firstElementChild) {
    return dom.firstElementChild
  } else {
    return dom.firstChild
  }
}
// 获取最后一个元素子节点
function getLastChild(dom){
  if (dom.lastElementChild) {
    return dom.lastElementChild
  } else {
    return dom.lastChild
  }
}
// 获取下一个兄弟子节点
function getNextNode(dom){
  if (dom.nextElementSibling) {
    return dom.nextElementSibling
  } else {
    return dom.nextSibling
  }
}
// 获取上一个兄弟子节点
function getPrevNode(dom){
  if (dom.previousElementSibling) {
    return dom.previousElementSibling
  } else {
    return dom.previousSibling
  }
}
// 生成 min~max区间的随机整数
function randomInt(min,max){
  return Math.round(Math.random()*(max-min))+min
}
// 生成随机16进制颜色值
function randomColor(){
  var str = '0123456789abcdef'// 0-15
  var color = '#'
  for (var i = 0, len = 6; i < len; i++){
    var index = randomInt(0,15)
    color += str[index]
  }
  return color
}
// 生成n位随机验证码（数字、字母（大小））
function randomCode(n){
  var num = ''
  for (var i = 0, len = n; i < len; i++){
    do {
      var ascii = randomInt(48,122)
    } while(ascii>57&&ascii<65 || ascii>90&&ascii<97)
    num += String.fromCharCode(ascii)
  }
  return num
}
// 判断数组中是否包含某个值
function has(arr,val){
  for (var i = 0, len = arr.length; i < len; i++){
    if (arr[i] == val) {
      return true
    }
  }
  return false
}
// 数组去重
function norepeat(arr){
  var arr1 = []
  for (var i = 0, len = arr.length; i < len; i++){
    if (!has(arr1,arr[i])) {
      arr1.push(arr[i])
    }
  }
  return arr1
}
// 获取元素样式 兼容IE678
function getStyle(dom,attr){
  if (dom.currentStyle) {
    return dom.currentStyle[attr]
  } else {
    return getComputedStyle(dom)[attr]
  }
}

function byClass(oClass){
  
}

// 添加事件监听（兼容低本版IE）
function addEvent(dom,type,callback){
  if (dom.addEventListener) {
    dom.addEventListener(type,callback)
  } else {
    dom.attachEvent('on'+type,callback)
  }
}
// 移除事件监听（兼容低本版IE）
function removeEvent(dom,type,callback){
  if (dom.removeEventListener) {
    dom.removeEventListener(type,callback)
  } else {
    dom.detachEvent('on'+type,callback)
  }
}
// 事件委托
function on(parent,type,selector,callback){
  // 1.给父级绑定事件
  addEvent(parent,type,function (ev){//父级的事件处理函数
    var e = ev || event//事件对象
    var target = e.target || e.srcElement//事件源
    // 获取选择器第一个字符
    var selector_first = selector.substr(0,1)
    // 记录选择器第一个字符后面的内容
    var selector_last = null
    // 记录选择器类型（id class 标签）
    var selector_type = null
    // 根据第一个字符判断选择器类型
    switch(selector_first){
      case '.':
        selector_type = 'className'
        selector_last = selector.slice(1)//'tit'
        break
      case '#':
        selector_type = 'id'
        selector_last = selector.slice(1)//'tit'
        break
      default:
        selector_type = 'tagName'
        selector_last = selector.toUpperCase()//'EM'
    }
    // if (target.tagName === selector.toUpperCase()){
    //   callback()
    // }
    // 判断点击元素是否为你希望触发事件的元素
    if (target[selector_type] === selector_last){
      callback.call(target,e)
    }
  })
}

// 获取某个元素到最外层左侧/顶部的距离
function offset(dom,bool){
  var l = 0
  var t = 0
  var domBDL = dom.clientLeft
  var domBDT = dom.clientTop
  while(dom){
    l += dom.clientLeft+dom.offsetLeft
    t += dom.clientTop+dom.offsetTop
    dom = dom.offsetParent
  }
  // return [l,t]
  if (bool) {// 带自身边框
    return {left: l,top: t}
  } else {// 不带自身边框
    return {left: l-domBDL,top: t-domBDT}
  }
}

function $1(selector){
  return document.querySelector(selector)
}
function $2(selector){
  return document.querySelectorAll(selector)
}

/** 
* 运动函数
* 参数：
*   dom 要运动的元素
*   attrObj 属性参数对象
*   callback 运动完成的回调函数
* 支持功能：
*   支持多个带px单位的属性：left top right bottom marginLeft marginTop width height ...
*   支持运动到任意位置
*   支持透明度运动
*   支持滚动条运动
*   可以自定义速度
*   支持多元素运动
*   支持多属性同时运动
*   支持运动完成之后进行其他操作（回调函数）
*/
function animate(dom,attrObj,callback){
  // attrObj = {
  //   'width': 200,
  //   'height': 200,
  //   'left': 532,
  //   'top': 500
  // }
  // attrObj = {
  //   'width':{
  //     'current': parseInt(getComputedStyle(dom)['width']),
  //     'target': attrObj['width']
  //   },
  //   'height':{
  //     'current': parseInt(getComputedStyle(dom)['height']),
  //     'target': attrObj['height']
  //   },
  //   'opacity':{
  //     'current': parseInt(getComputedStyle(dom)['opacity']*100),
  //     'target': attrObj['opacity']*100
  //   },
  //   ...
  // }
  for(var key in attrObj){
    // 判断要运动的属性
    if (key === 'opacity') {
      var current = parseInt( getComputedStyle(dom)[key]*100 )
      var target = attrObj[key]*100
    } else if (key.indexOf('scroll') !== -1) {
      var current = dom[key]// wrap.scrollTop
      var target = attrObj[key]
    } else {
      var current = parseInt( getComputedStyle(dom)[key] )
      var target = attrObj[key]
    }
    attrObj[key] = {
      'current': current,
      'target': target
    }
  }

  /* // 判断要运动的属性
  if (attr === 'opacity') {
    // 属性的当前值
    var current = parseInt( getComputedStyle(dom)[attr]*100 )
    // 属性的目标值
    target *= 100
  // } else if (attr === 'scrollTop' || attr === 'scrollLeft') {
  } else if (attr.indexOf('scroll') !== -1) {
    // 属性的当前值
    var current = dom[attr]
  } else {
    // 属性的当前值
    var current = parseInt( getComputedStyle(dom)[attr] )
  } */

  clearInterval(dom.timer)
  dom.timer = setInterval(function (){
    for (var key in attrObj){
      // 当前属性 key
      // key属性的当前值 attrObj[key].current
      var current = attrObj[key].current
      // key属性的目标值 attrObj[key].target
      var target = attrObj[key].target

      // 持续变化的速度
      var speed = (target-current)/10
      // 根据运动方向进行取整
      speed = speed>0?Math.ceil(speed):Math.floor(speed)

      // 当前位置+速度
      attrObj[key].current+=speed

      // 临界值判断(运动停止条件：剩余运动量 <= 每次的运动量)
      if ( Math.abs(target-current) <= Math.abs(speed) ) {
        attrObj[key].current = target//到达目的地
        
        // 删除运动完成的属性
        delete attrObj[key]

        // 判断对象中是否还有其他属性
        for (var attr in attrObj){//{}
          // 能执行进来说明对象还有其他属性
          return false//终止当前函数执行
        }
        
        // 所有属性运动完成，清除计时器
        clearInterval(dom.timer)

        // 运动完成执行回调函数
        typeof callback === 'function'?callback():''
      } else {
        // 持续改变运动属性
        if (key === 'opacity') {
          dom.style[key] = attrObj[key].current/100
        } else if (key.indexOf('scroll') !== -1) {
          dom[key] = attrObj[key].current
        } else {
          dom.style[key] = attrObj[key].current + 'px'
        }
      }
    }
  },20)
}

// IE 6 7 8不支持
function byClass(oClass){
  var arr = []
  var tags = document.all||document.getElementsByTagName('*')
  var reg = new RegExp('\\b'+oClass+'\\b')
  for (var i = 0, len = tags.length; i < len; i++){
    if ( reg.test(tags[i].className) ){
      arr.push(tags[i])
    }
  }
  return arr
}
