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

// 错误提示
export function errorTip(text) {
    let content =  `<div class="serverErrorTip animated fadeIn">${text}</div>`
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