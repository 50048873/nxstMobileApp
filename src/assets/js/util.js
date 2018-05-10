import $ from 'jquery'
import { defaultDocumentTitle, resourceList } from "@/assets/js/config";
import {getItem,setItem} from '@/assets/js/session.js'

export let toString = Object.prototype.toString

export function isArray(arr) {
  return toString.call(arr) === "[object Array]"
}

export function isString(str) {
  return toString.call(str) === "[object String]"
}

// 获取数组最大值
export function getMax(arr) {
  if (toString.call(arr) === "[object Array]") {
    let reverse = arr.reverse()
    let res = reverse && reverse[0]
    return JSON.stringify(res)
  }
  return null
}

// 标准化requestAnimationFrame方法
export function normalizeRequestAnimationFrame() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // Webkit中此取消方法的名字变了
                                      window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
};

// 提示
export function hint(text) {
    let content =  `<div class="serverErrorTip animated fadeIn">${text}</div>`
    if ($('body > .serverErrorTip').length) return
    let $back = $(content).appendTo('body')
    setTimeout(() => {
        $back.removeClass('fadeIn').addClass('fadeOut')
        $back.on('webkitanimationend animationend', () => {
            $back.remove()
            $back = null
        })
        setTimeout(() => {
            let $serverError = $('.serverErrorTip')
            if ($serverError.length) {
                $serverError.remove()
            }
        }, 2000)
    }, 2000)
    return $back
}

// 服务器错误提示
export function serverErrorTip(err, filename) {
    let content =  `<div class="serverErrorTip animated fadeIn"><p>错误状态码：${err.status}</p><p>错误描叙：${err.statusText}</p><p>错误文件：${filename}</p></div>`
    if ($('body > .serverErrorTip').length) return
    let $back = $(content).appendTo('body')
    setTimeout(() => {
        $back.removeClass('fadeIn').addClass('fadeOut')
        $back.on('webkitanimationend animationend', () => {
            $back.remove()
            $back = null
        })
        setTimeout(() => {
            let $serverError = $('.serverErrorTip')
            if ($serverError.length) {
                $serverError.remove()
            }
        }, 2000)
    }, 2000)
}

// 设置文档标题
export function setDocumentTitle(title) {
    window.document.title = title || defaultDocumentTitle
}

// .container 设置了 overflow 属性, 导致 Android 手机下输入框获取焦点时, 输入法挡住输入框的 bug
// 相关 issue: https://github.com/weui/weui/issues/15
// 解决方法:
// 0. .container 去掉 overflow 属性, 但此 demo 下会引发别的问题
// 1. 参考 http://stackoverflow.com/questions/23757345/android-does-not-correctly-scroll-on-input-focus-if-not-body-element
//    Android 手机下, input 或 textarea 元素聚焦时, 主动滚一把
export function androidInputBugFix(){
    if (/Android/gi.test(window.navigator.userAgent)) {
        window.addEventListener('resize', function () {
            if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
                window.setTimeout(function () {
                    document.activeElement.scrollIntoViewIfNeeded();
                }, 0);
            }
        })
    }
}

// 全局loading
let loadingImg = require('@/assets/img/loading.gif')
export let loading = {
    $loading: [],
    show() {
        let content =  `<div class="n-loading">
                            <img width="24" height="24" src="${loadingImg}">
                            <span class="desc">请求中...</span>
                        </div>`
        this.$loading.push($(content).appendTo('body'))
    },
    remove() {
        if (!this.$loading.length) return
        let len = this.$loading.length
        for (let i = 0; i < len; i++) {
            this.$loading[i].remove()
        }
    }
};

/*
* 生成uuid
* 这个可以指定长度和基数。比如
    // 8 character ID (base=16)
    uuid(32, 16) // "098F4D35"
* */
export let getUuid = function (len, radix) {
    let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    let uuid = [], i;
    radix = radix || chars.length;

    if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
        // rfc4122, version 4 form
        let r;

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random()*16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }

    return uuid.join('');
};

// 对象URL（blob URL），指的是引用保存在File或Blob中数据的URL
export function createObjectURL(blob) {
    if (window.URL) {
        return window.URL.createObjectURL(blob)
    } else if (window.webkitURL) {
        return window.webkitURL.createObjectURL(blob)
    } else if (window.mozURL) {
        return window.mozURL.createObjectURL(blob)
    } else {
        return null
    }
}

// dataURL转换为Blob对象
export function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}

// dataURL转换为File对象
export function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}

// 压缩图片并输出dataURL格式
export function compress(img, width, height, ratio, fileType) {        
 let canvas, ctx, img64;
       
 canvas = document.createElement('canvas');        
 canvas.width = width;
 canvas.height = height;
       
 ctx = canvas.getContext("2d");        
 ctx.drawImage(img, 0, 0, width, height);
       
 img64 = canvas.toDataURL(fileType, ratio);
       
 return img64;
}

// 获取当月第一天
export function getFirstDayOfMonth() {        
    let date = new Date(),
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = 1
    return new Date(`${year}/${month}/${day}`)
}

// 获取当年1月1日
export function getNewYearDay(strDate) { 
    let date
    if (isString(strDate)) {
        date = new Date(strDate)
    } else {
        date = new Date()
    }      
    let year = date.getFullYear()
    return new Date(`${year}-1-1`)
}

// 获取当日上月同一天
export function getSameDayOfPreMonth(strDate) { 
    let date
    if (isString(strDate)) {
        date = new Date(strDate)
    } else {
        date = new Date()
    }       
    let year = date.getFullYear(),
        month = date.getMonth(),
        day = date.getDate()
    return new Date(`${year}/${month}/${day}`)
}


function isLeapYear(year) {
  return (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0);
}


// 获取当日之前7天
export function get7DayOfcurrentDay(strDate) { 
    let date
    if (isString(strDate)) {
        date = new Date(strDate)
    } else {
        date = new Date()
    }
    let year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate()
    if (day > 7) {
        day = day - 7
    } else {
        let _month
        month = month - 1;
        if (month === 0) {
          year = year - 1
          month = 12
        }
        if ([1,3,5,7,8,10,12].indexOf(month)>-1) {
            _month = 31
        }else if ([4,6,9,11].indexOf(month)>-1){
            _month = 30
        } else if (isLeapYear(year)){
            _month = 28;
        }else{
            _month = 29
        }
        day = (day - 7) + _month 
    }
    return new Date(`${year}/${month}/${day}`)
}

// 获取当日或指定日期早8点
export function get8am(strDate) { 
    let date
    if (isString(strDate)) {
        date = new Date(strDate)
    } else {
        date = new Date()
    }      
    let year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        hour = '08',
        minute = '00',
        second = '00'
    return new Date(`${year}/${month}/${day} ${hour}:${minute}:${second}`)
}

// 根据传入属性，返回浏览器支持的前缀
export function getSurportCss(prop) { 
    var div = document.createElement('div'),
        prefixs = 'webkit moz ms'.split(' '),
        len = prefixs.length;

    if ( prop in div.style ) return prop;

    var replaceStr = function(str){ 
        var reg = /\b(\w)|\s(\w)/g; //  \b判断边界\s判断空格
        return str.replace(reg,function(m){ 
            return m.toUpperCase()
        });
    }
    prop = replaceStr(prop);

    while(len--) {
        if ( prefixs[len] + prop in div.style ) {
            return prefixs[len] + prop;
        }
    }
    
    return false; 
};

// 按数组对象里的日期格式化成标准
export function standardDate(data) {
  if (isArray(data) && data.length) {
    data.forEach((item) => {
      let index = item.date.indexOf(':')
      if (index > -1) {
          item.date = item.date.substr(0, index)
      }
    })
    let res = []
    res.push(data[0])
    data.reduce((prev, cur, index) => {
      let obj = {}
      obj.value = cur.value
      if (prev.date.indexOf('-')) {
        let prevArr = prev.date.split('-'),
            curArr = cur.date.split('-'),
            prevY = prevArr[0],
            prevM = prevArr[1],
            prevD = prevArr[2],
            curY = curArr[0],
            curM = curArr[1],
            curD = curArr[2]
        if (curY === prevY) {
          if (curD) {
            obj.date = `${curM}-${curD}`
          } else {
            obj.date = curM
          }
          if (curM === prevM) {
            obj.date = curD
            if (curD.indexOf(' ') > -1) {
              let _curD = curD.split(' '),
                  _prevD = prevD.split(' ')
              if (_curD[0] === _prevD[0]) {
                obj.date = curD.split(' ')[1]
              }
            }
          }
        } else {
          obj.date = cur.date
        }
      } else {
        obj.date = cur.date
      }
      res.push(obj)
      return cur
    })
    return res
  }
  return data
}


// 节流
export function throttle(fn, context, time) {
    clearTimeout(fn.tId)
    fn.tId = setTimeout(function() {
        fn.call(context)
    }, time || 100)
}


/*
* @param   
     userresourceList     用户权限列表
     resourceList         菜单权限列表
  @description            判断当前用户是否具有本资源的权限
*/
export  function handleAuth(key){
    if(getItem("sourceList")&&JSON.parse(getItem("sourceList")).length>0){
       return JSON.parse(getItem("sourceList")).indexOf(resourceList[key])>0?true:false 
    }else{
        console.log("没有取到本地sourcelist");
        return false
    }   
}

/*
* @param   
     pid     水库id设置
  @description     设置水库id存储
*/

export function setPid(value){
    setItem("pid",value)
}
/*
* @param   
  @description     获取水库id
*/
export function getPid(){
    return getItem("pid")
}

/*
* @param   
  @description     获取水库名称
*/
export function setPname(value) {
   setItem("pname", value)
}

/*
* @param   
  @description     获取水库id
*/
export function getPname() {

  return getItem("pname")

}

/*
* @param   
  @description     获取用户名称
*/
export function getUsername() {

  return getItem("username")

}


