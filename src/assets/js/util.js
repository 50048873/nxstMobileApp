import $ from 'jquery'
import {defaultDocumentTitle} from '@/assets/js/config'

export let toString = Object.prototype.toString

export function isArray(arr) {
  return toString.call(arr) === "[object Array]"
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
export let loading = {
    $loading: null,
    show() {
        let content =  `<div class="n-loading">
                            <img width="24" height="24" src="/static/img/loading.gif">
                            <span class="desc">请求中...</span>
                        </div>`
        this.$loading = $(content).appendTo('body')
    },
    hide() {
        this.$loading.remove()
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
    return new Date(`${year}-${month}-${day}`)
}

