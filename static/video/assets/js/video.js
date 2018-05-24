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
        streamHost = 'sw.dse.cn:56024',
        url = "/api/v1",
        username = 'admin',
        password = $.md5('admin'),
        players = [],
        ErrorNum = '200';

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

        if (win.navigator.userAgent.indexOf('rv:11') > -1) {
          var parentIframe = win.parent.document.getElementsByTagName('iframe')[0];
          parentIframe.setAttribute('allowfullscreen');
        }
        
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
          currentIndex: -1,
          channelsconfigWithOnvif: []
        }
      },
      computed: {
        getDisable: function() {
          if (this.currentIndex > -1) {
            var channel = this.channelsByVideoCount[this.currentIndex];
            return (channel.Protocol === 'ONVIF' && channel.isSuccessedPlay) ? '' : 'DISABLE';
          }
        },
        getDisableTitle: function() {
          if (this.currentIndex > -1) {
            return this.channelsByVideoCount[this.currentIndex].Protocol === 'ONVIF' ? '' : this.noEventTitle;
          }
        }
      },
      methods: {
        getserverinfo: function() {
          return $.ajax({
            type: "GET",
            url: host + url + "/getserverinfo",
            success: function(data) {
              var ret = JSON.parse(data),
                  InterfaceVersion = ret.EasyDarwin.Body.InterfaceVersion;
              if (InterfaceVersion) {
                url = "/api/" + InterfaceVersion;
              }
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
            }
          });
        },
        getchannels: function() {
          var _this = this;
          
          return $.ajax({
            type: 'GET',
            url: host + url + "/getchannels?t="+new Date().getTime(),
            success: function(data) {
              // console.log(JSON.stringify(data, null, 2))
              var ret = JSON.parse(data);
              if (ret.EasyDarwin.Body.ChannelCount == 0) {
                _this.showDialog('当前没有通道，记得配置通道哦！');
                if (!isPc) {
                  $("body").append("<div class='noChannel'>当前没有通道，记得配置通道哦！</div>")
                }
              } else {
                var channels = ret.EasyDarwin.Body.Channels;
                channels.sort(function (a, b) {
                    return parseInt(a["Channel"]) - parseInt(b["Channel"]);
                });
                channels.forEach(function(item, index) {
                  if (item.SnapURL) {
                    item.SnapURL = host + item.SnapURL
                  }
                  if (item.LiveUrl) {
                    item.LiveUrl = host + item.LiveUrl
                  }
                });
                _this.channels = channels;
              }
              return data;
            }
          })
        },
        getchannelstream: function(res) {
          res = JSON.parse(res);
          if (res.EasyDarwin.Body.ChannelCount == '0') return;
          var channels = res.EasyDarwin.Body.Channels,
              ajaxs = [],
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
                  }
                });
              }
          
          for (var i = 0; i < len; i++) {
            ajaxs.push(ajax(channels[i]))
          }

          ajaxs.push(this.getchannelsconfig());

          return $.when.apply($, ajaxs).then(function() {
            var res = arguments,
                channelsconfig = Array.prototype.splice.call(res, res.length - 1),
                channelstream = res,
                len = channelstream.length,
                arr = [];

            if (channelsconfig.length === 1) {
              channelsconfig = JSON.parse(channelsconfig[0][0]).EasyDarwin.Body.Channels;
            }

            for (var i = 0; i < len; i++) {
              var item = null;

              if (channelstream[1] === 'success') {
                item = JSON.parse(channelstream[0]);
              } else {
                item = JSON.parse(channelstream[i][0]);
              }

              var url = item.EasyDarwin.Body.URL;

              if (isPc) {
                item.EasyDarwin.Body.URL = url.replace('{host}:10935', streamHost);
              } else {
                item.EasyDarwin.Body.URL = host + url;
              }
              arr.push(item.EasyDarwin.Body);
            }
            arr.sort(function (a, b) {
                return parseInt(a["Channel"]) - parseInt(b["Channel"]);
            })
            return { 
              channelstream: arr,
              channelsconfig: channelsconfig
            }
          });
        },
        setchannelconfig: function(data) {
          var _this = this;
          var baseParams = {
            t: new Date().getTime(),
            Channel: -1,
            Enable: 1,
            IP: '10.100.50.151',
            Name: '',
            Port: 554,
            Protocol: 'RTSP',
            Username: 'admin',
            Password: 'admin12345',
            RTSP: 'rtsp://10.100.50.151:554/Streaming/Channels/101',
            TransProtocol: 'TCP'
          };
          data = $.extend({}, baseParams, data);
          return $.ajax({
            type: "GET",
            url: host + url + "/setchannelconfig",
            data: data,
            xhrFields: { 
              withCredentials: true
            },
            crossDomain: true, 
            success: function(data) {
              data = JSON.parse(data)
              if (ErrorNum === data.EasyDarwin.Header.ErrorNum) {
                _this.showDialog('码流已切换！')
                  .then(function(res) {
                    if (res) {
                      setTimeout(function() {
                        window.location.reload();
                      }, 100);
                    }
                  });
              }
            }
          });
        },
        getchannelsconfig: function() {
          var _this = this;
          return $.ajax({
            type: "GET",
            url: host + url + "/getchannelsconfig",
            
            success: function(data) {
              data = JSON.parse(data);
              var channelsconfig = data.EasyDarwin.Body.Channels;
              channelsconfig.sort(function (a, b) {
                  return parseInt(a["Channel"]) - parseInt(b["Channel"]);
              });
              return channelsconfig;
            }
          })
        },
        initBasic: function() {
          this.noEventTitle = '此设备不支持此功能';
          videojs.options.flash.swf = './assets/video-js-5.19.2/video-js-fixed.swf';
          // videojs.options.techOrder = ['html5','flash'];
          isPc ? $(document.documentElement).addClass('pc') : $(document.documentElement).addClass('mobile');
          $.ajaxSetup({
            xhrFields: { 
              withCredentials: true
            },
            crossDomain: true, 
            error: function (xhr, ts, err) {
              console.log(arguments);
            }
          });
        },
        selectVideo: function(index) {
          this.currentIndex = index;
        },
        getsnap: function() {
          if (!isPc) return;
          if (this.currentIndex === -1) {
            this.showDialog('请先选择要抓图的视频');
            return;
          }
          var channel = this.channelsByVideoCount[this.currentIndex]['Channel'];
          if (!channel) {
            this.showDialog('请选择有信号的视频');
            return;
          }

          var funDownload = function (filename) {
              var eleLink = document.createElement('a');
              eleLink.download = filename || new Date().getTime();
              eleLink.target = '_blank';
              eleLink.style.display = 'none';
              eleLink.href = host + url + "/getsnap" + '?channel=' + channel;
              document.body.appendChild(eleLink);
              eleLink.click();
              document.body.removeChild(eleLink);
          };
          funDownload();
        },
        showDialog: function(text, primaryBtn) {
          var _this = this;
          primaryBtn = primaryBtn || '关闭';
          var $dialog = $('<div class="js_dialog" id="androidDialog2" style="display: none;">' + 
                          '<div class="weui-mask"></div>' + 
                          '<div class="weui-dialog weui-skin_android">' + 
                              '<div class="weui-dialog__bd">' + text + '</div>' +
                              '<div class="weui-dialog__ft">' + 
                                  '<a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary">' + primaryBtn + '</a>' +
                              '</div>' +
                          '</div>' +
                      '</div>');
          this.$dialog = $dialog.appendTo('body').fadeIn(200);
          var deferred = $.Deferred();
          $(document).on('click', '.weui-dialog__btn_primary', function(){
            deferred.resolve(true);
            $(this).parents('.js_dialog').fadeOut(200);
            setTimeout(function() {
              _this.$dialog.remove();
            }, 200);
          });
          return deferred;
        },
        isInvalidChoose: function() {
          if (this.currentIndex === -1) {
            this.showDialog('请先选择要调整的视频！')
              .then(function(res) {
                console.log(res)
              })
            return true;
          }
          var protocol = this.channelsByVideoCount[this.currentIndex].Protocol,
              isSuccessedPlay = this.channelsByVideoCount[this.currentIndex].isSuccessedPlay,
              hasVideo = this.channelsByVideoCount[this.currentIndex].URL;
          if (!hasVideo) {
            this.showDialog('无视频，请先配置视频通道！');
            return true;
          }
          return false
        },
        changeCodeStream: function() {
          if (!this.channels.length) return;
          var _this = this;
          $(document).on('click', '#codeStream .ITEM', function() {
            if (_this.isInvalidChoose()) return;
            var $this = $(this);
            var channel = _this.channelsByVideoCount[_this.currentIndex],
                codeStreamType = $this.data('codestream').toString();
                // console.log(channel.ChannelName)
            if (channel.RTSP.substr(channel.RTSP.length - 1, 1) === codeStreamType) {
              _this.showDialog('码流相同！');
              return;
            };

            var data = {
              Channel: channel.Channel,
              Name: channel.ChannelName,
              Protocol: channel.Protocol,
              RTSP: 'rtsp://10.100.50.151:554/Streaming/Channels/10' + codeStreamType
            };
            // console.log(data)
            _this.setchannelconfig(data)
          });
        }
      },
      created: function() {
        var _this = this;
        this.initBasic();
        this.getserverinfo()
          .then(function() {
            return _this.login();
          })
          .then(function() {
            return _this.getchannels();
          })
          .then(function(res) {
            return _this.getchannelstream(res);
          })
          .then(function(res) {
            var len = _this.channels.length,
                channelstream = res.channelstream,
                channelsconfig = res.channelsconfig,
                arr = [];
                // console.log(channelsconfig)
            for (var i = 0; i < len; i++) {
              for (var j = 0; j < channelsconfig.length; j++) {
                if (_this.channels[i].Channel === channelsconfig[j].Channel) {
                  var channelconfigWithPartField = {
                    Protocol: channelsconfig[j].Protocol,
                    RTSP: channelsconfig[j].RTSP
                  };
                  continue;
                }
              }
              
              arr[i] = $.extend({}, _this.channels[i], channelstream[i], channelconfigWithPartField);
            }
            _this.channels = arr;
            // console.log(arr);
            _this.$nextTick(function() {
              if (isPc) {
                _this.handlePc();
              } else {
                _this.handleMobile();
              }
              _this.changeCodeStream();
            })                 
          });
      }
    };

    return {
      utils: utils,
      isPc: isPc,
      mixins: mixins,
      host: host,
      streamHost: streamHost,
      url: url,
      username: username,
      password: password,
      players: players,
      ErrorNum: ErrorNum
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