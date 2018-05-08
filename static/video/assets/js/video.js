(function(doc, win) {
  win.nxst = function() {
    var isPc = function() {
      if("ontouchend" in document) return false;
      var ua = navigator.userAgent.toLowerCase();
      var agents = ["android", "iphone",
          "symbianos", "windows phone",
          "ipad", "ipod"];
      var flag = true;
      for (var v in agents) {
          if (ua.indexOf(agents[v]) > 0) {
              flag = false;
              break;
          }
      }
      return flag;
    }();

    /*
      * http://10.100.50.129:10800 => http://sw.dse.cn:56023
      * http://10.100.50.129:10935 => http://sw.dse.cn:56024
    */

    var host = 'http://sw.dse.cn:56023',
        streamUrl = 'sw.dse.cn:56024',
        url = "/api/v1",
        username = 'admin',
        password = $.md5('admin'),
        players = [];

    var utils = { 
      addFullScreenEventListener: function(clickedSelector, fullScreenSelector, exitFullscreenCallback, requestFullscreenCallback) {
        var requestFullscreen = function(ele) {
          ele = document.querySelector(ele);
          if (ele.requestFullscreen) {
            ele.requestFullscreen()
          } else if (ele.webkitRequestFullscreen) {
            ele.webkitRequestFullscreen()
          } else if (ele.webkitRequestFullScreen) {
            ele.webkitRequestFullScreen()
          } else if (ele.mozRequestFullScreen) {
            ele.mozRequestFullScreen()
          } else if (ele.msRequestFullscreen) {
            ele.msRequestFullscreen()
          }
        };

        var exitFullscreen = function() {
          if (document.exitFullscreen) {
            document.exitFullscreen()
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen()
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen()
          }
        };

        var fullscreenchange = function() {
          if ('onfullscreenchange' in document) {
            return 'fullscreenchange'
          } else if ('onwebkitfullscreenchange' in document) {
            return 'webkitfullscreenchange'
          } else if ('onmozfullscreenchange' in document) {
            return 'mozfullscreenchange'
          } else if ('onmsfullscreenchange' in document) {
            return 'msfullscreenchange'
          }
        }();

        var fullScreen = function() {
          return document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement
        };
        
        var clickedEle = document.querySelector(clickedSelector);
        clickedEle.addEventListener("click", function() {
          if (fullScreen()) {
            exitFullscreen();
            exitFullscreenCallback && exitFullscreenCallback(this);
          } else {
            requestFullscreen(fullScreenSelector)
            requestFullscreenCallback && requestFullscreenCallback(this);
          }
        });

        if (arguments[0] !== arguments[1]) {
          document.addEventListener(fullscreenchange, function() {
            if (fullScreen()) {
              clickedEle.title = '退出全屏'
              clickedEle.innerHTML = '退出全屏'
            } else {
              clickedEle.title = '全屏'
              clickedEle.innerHTML = '全屏'
            }
          });
        }
      },
      throttle: function (fn, context, time) {
        clearTimeout(fn.tId);
        fn.tId = setTimeout(function() {
            fn.call(context);
        }, time || 100);
      }
    };

    var mixins = {
      data: function() {
        return {
          isPc: isPc,
          currentIndex: -1
        }
      },
      methods: {
        getserverinfo: function() {
          return $.ajax({
            type: "GET",
            url: host + url + "/getserverinfo",
            success: function(data) {
              var ret = JSON.parse(data);
              url = "/api/" + ret.EasyDarwin.Body.InterfaceVersion;
              return data
            }
          })
        },
        login: function() {
          return $.ajax({
            type: "GET",
            url: host + url + "/login?t="+new Date().getTime(),
            data: {
                username: username,
                password: password
            },
            success: function(data) {
              var ret = JSON.parse(data),
                  token = ret.EasyDarwin.Body.Token;
              $.cookie("token", "", {
                  expires: -1
              });
              $.cookie("token", token);
              $.cookie("username", username);
              return data
            },
            error: function(xhr, ts, err) {
              console.log(arguments)
            }
          });
        },
        getchannels: function() {
          var _this = this;
          
          return $.ajax({
            type: 'GET',
            url: host + url + "/getchannels?t="+new Date().getTime(),
            success: function(data) {
              var ret = JSON.parse(data);
              if (ret.EasyDarwin.Body.ChannelCount == 0) {
                $("body").append("<div class='noChannel'>当前没有通道，记得配置通道哦！</div>")
              } else {
                var channels = ret.EasyDarwin.Body.Channels;
                channels.sort(function (a, b) {
                    return parseInt(a["Channel"]) - parseInt(b["Channel"]);
                })
                channels.forEach(function(item, index) {
                  if (item.SnapURL) {
                    item.SnapURL = host + item.SnapURL
                  }
                  if (item.LiveUrl) {
                    item.LiveUrl = host + item.LiveUrl
                  }
                })
                _this.channels = channels
              }
              return data
            }
          })
        },
        getchannelstream: function(res) {
          var res = JSON.parse(res),
              channels = res.EasyDarwin.Body.Channels,
              arr = [],
              len = channels.length,
              ajax = function(channel) { 
                return $.ajax({
                  type: "GET",
                  url: host + url + "/getchannelstream",
                  data: {
                      Channel: channel["Channel"],
                      Protocol: isPc ? "RTMP" : "HLS",
                      Line: "local",
                      From: "lan"
                  },
                  success: function (data) {
                    return data
                  },
                  error: function (xhr, ts, err) {
                    console.log(arguments);
                  }
                });
              }
          
          for (var i = 0; i < len; i++) {
            arr.push(ajax(channels[i]))
          }

          return $.when.apply($, arr).then(function() {
            var res = arguments,
                len = res.length,
                arr = [];

            for (var i = 0; i < len; i++) {
              var item = null;

              if (res[1] === 'success') {
                item = JSON.parse(res[0])
              } else {
                item = JSON.parse(res[i][0])
              }

              var url = item.EasyDarwin.Body.URL;

              if (isPc) {
                item.EasyDarwin.Body.URL = url.replace('{host}:10935', streamUrl);
              } else {
                item.EasyDarwin.Body.URL = host + url;
              }
              arr.push(item.EasyDarwin.Body);
            }
            arr.sort(function (a, b) {
                return parseInt(a["Channel"]) - parseInt(b["Channel"]);
            })
            return arr
          });
        },
        initBasic: function() {
          videojs.options.flash.swf = './assets/video-js-5.19.2/video-js-fixed.swf';
          videojs.options.techOrder = ['html5','flash'];
          isPc ? $(document.documentElement).addClass('pc') : $(document.documentElement).addClass('mobile');
        },
        selectVideo: function(index) {
          this.currentIndex = index;
        },
        getsnap: function() {
          if (this.currentIndex === -1) {
            alert('请先选择要抓图的视频');
            return
          }
          var channel = this.channelsByVideoCount[this.currentIndex]['Channel'];
          return $.ajax({
            type: "GET",
            url: host + url + "/getsnap",
            data: {
              channel: channel
            },
            success: function(data) {
              console.log(data)
              var funDownload = function (content, filename) {
                  // 创建隐藏的可下载链接
                  var eleLink = document.createElement('a');
                  eleLink.download = filename;
                  eleLink.style.display = 'none';
                  // 字符内容转变成blob地址
                  var blob = new Blob([content]);
                  eleLink.href = URL.createObjectURL(blob);
                  // 触发点击
                  document.body.appendChild(eleLink);
                  eleLink.click();
                  // 然后移除
                  document.body.removeChild(eleLink);
              };
              funDownload(data, 'a.jpeg');
            }
          })
        }
      },
      created: function() {
        var _this = this;
        this.noEventTitle = '此设备不支持此功能';
        this.initBasic();
        this.getserverinfo()
          .then(function() {
            return _this.login()
          })
          /*.then(function() {
            var data = {
              t: new Date().getTime(),
              Channel: 2,
              Enable: 1,
              IP: '10.100.50.151',
              Name: '151',
              Port: 554,
              Protocol: 'RTSP',
              Username: 'admin',
              Password: 'admin12345',
              RTSP: 'rtsp://10.100.50.151:554/Streaming/Channels/101',
              TransProtocol: 'TCP'
            };
            return $.ajax({
              type: "GET",
              url: host + url + "/setchannelconfig",
              data: data,
              xhrFields: { 
                withCredentials: true
              },
              crossDomain: true, 
              success: function(data) {
                console.log(data)
                return
              }
            })
          })*/
          .then(function() {
            return _this.getchannels()
          })
          .then(function(res) {
            return _this.getchannelstream(res)
          })
          .then(function(res) {
            var len = _this.channels.length,
                arr = [];
            for (var i = 0; i < len; i++) {
              arr[i] = $.extend({}, _this.channels[i], res[i])
            }
            _this.channels = arr;
            _this.$nextTick(function() {
              if (isPc) {
                _this.handlePc();
              } else {
                _this.handleMobile();
              }  
            })                 
          })
      }
    };

    return {
      utils: utils,
      isPc: isPc,
      mixins: mixins,
      host: host,
      url: url,
      username: username,
      password: password,
      players: players
    }
  }();
})(document, window);


(function($, win) {
  var isPc = win.nxst.isPc;

  if (isPc) {
    $('<script src="./assets/js/pc.js"></script>').appendTo('body');
  } else {
    $('<script src="./assets/js/mobile.js"></script>').appendTo('body');
  }
})(jQuery, window);