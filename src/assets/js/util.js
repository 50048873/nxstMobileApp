import $ from 'jquery'

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
export function errorTip(text, filename) {
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
    window.document.title = title
}