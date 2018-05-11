(function($) {
  var host = 'http://' + window.location.host.split(":")[0] + ':10800',
      _url = "/api/v1",
      username = 'admin',
      password = $.md5('admin'),
      players = [];

  videojs.options.flash.swf = './adminlte-2.3.6/plugins/video-js-5.19.2/video-js-fixed.swf';
  videojs.options.techOrder = ['html5','flash'];

  nxst.isPc ? $(document.documentElement).addClass('pc') : $(document.documentElement).addClass('mobile');

  new Vue({
    el: '#videoWrap',
    data: function() {
      return {
        channels: [],
        videoCount: 4,
        volumnValue: 10
      }
    },
    computed: {
      channelsByVideoCount: function() {
        var res = this.channels.concat();
        if (res.length < this.videoCount) {
          var obj = {};
          var channel = res[0]
          for (var i in channel) {
            obj[i] = ''
          }
          var diffCount = this.videoCount - res.length;
          for (var i = 0; i < diffCount; i++) {
            res.push(obj)
          }
        } else if (res.length > this.videoCount) {
          res = this.channels.slice(0, this.videoCount)
        }
        return res
      },
      getVedioLayoutClass: function() {
        var col = '';
        switch (this.videoCount) {
          case 1:
            col = 'col-lg-12';
            break;
          case 4:
            col = 'col-lg-6';
            break;
          case 9:
            col = 'col-lg-4';
            break;
          case 16:
            col = 'col-lg-3';
            break;
        }
        return col
      },
      type: function() {
        return nxst.isPc ? "rtmp/mp4" : "application/x-mpegURL"
      }, 
      videoParentContainerHeight: function() {
        if (nxst.isPc) {
          return ''
          return {
            width: '100%',
            height: '100%'
          }
        }
        return {
          width: '100%',
          height: ((window.innerWidth - 15 * 2) * 9 / 16) + 'px'
        }
      }
    },
    methods: {
      getVedioBg: function(url) {
        return url ? { backgroundImage: 'url(' + url + ')' } : ''
      },
      getOnlineText: function(status) {
        return status == 1 ? '在线' : '离线'
      },
      getOnlineClass: function(status) {
        return status == 1 ? 'green' : ''
      },
      getserverinfo: function() {
        return $.ajax({
          type: "GET",
          url: host + _url + "/getserverinfo",
          async: false,
          success: function(data) {
            var ret = JSON.parse(data);
            _url = "/api/" + ret.EasyDarwin.Body.InterfaceVersion;
            return data
          }
        })
      },
      login: function() {
        return $.ajax({
          type: "GET",
          url: host + _url + "/login?t="+new Date().getTime(),
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
          url: host + _url + "/getchannels?t="+new Date().getTime(),
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
                url: host + _url + "/getchannelstream",
                data: {
                    Channel: channel["Channel"],
                    Protocol: nxst.isPc ? "RTMP" : "HLS",
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
            var item = JSON.parse(res[i][0]),
                url = item.EasyDarwin.Body.URL;
            if (nxst.isPc) {
              item.EasyDarwin.Body.URL = url.replace('{host}', 'localhost')
            } else {
              item.EasyDarwin.Body.URL = host + url
            }
            arr.push(item.EasyDarwin.Body)
          }
          arr.sort(function (a, b) {
              return parseInt(a["Channel"]) - parseInt(b["Channel"]);
          })
          return arr
        });
      },
      handlePc: function() {
        this.playAll();
        this.handlePcEvent();
      },
      playAll: function() {
        if (players.length) {
          $('.video-js').css('opacity', 1);
          return
        }
        var videos = document.querySelectorAll('.video-js'),
            i = 0, 
            len = videos.length,
            pl = null;
        while (i < len) {
          var video = videos[i],
              sourceSrc = $(video).find('source').attr('src');
          if (sourceSrc) {
            pl = videojs(video, {
              notSupportedMessage : '您的浏览器没有安装或开启Flash,戳我开启！',
              techOrder : ["flash"],
              autoplay : false,
              controls: true
            }, function() {
              players.push(this);
              this.play();
            });
          }
          i++;
        }
      },
      stopAll: function() {
        $('.video-js').css('opacity', 0);
      },
      handlePcEvent: function() {
        var _this  = this;
        $(document).on('click', '.controls', function() {
          var $this = $(this),
              $video = $this.hide().prev(),
              video = $video[0];
          $this.next().hide();
          videojs(video,{
            notSupportedMessage : '您的浏览器没有安装或开启Flash,戳我开启！',
            techOrder : ["flash"],
            autoplay : true,
            controls: true
          });
        }).on('click', '.fold', function() {
          var $this = $(this),
              $btns = $('.btns');
          $this.find('i').toggleClass('sj-r sj-l');
          $btns.toggleClass('OFF');
        }).on('click', '#allStart', function() {
          var videos = document.querySelectorAll('.video-js');
          _this.playAll(videos);
        }).on('click', '#allStop', function() {
          var videos = document.querySelectorAll('.video-js');
          _this.stopAll(videos);
        });

        nxst.utils.addFullScreenEventListener('#fullScreen', '#videoWrap', function(clickedEle) { 
          $(clickedEle).text('全屏').attr('title', '全屏');
        }, function(clickedEle) {
          $(clickedEle).text('退出全屏').attr('title', '退出全屏');
        });
      },
      handleMobile: function() {
        this.handleMobileEvent();
      },
      handleMobileEvent: function() {
        var _this = this;
        $(document).on('click', '.controls', function() {
          var $this = $(this),
              $video = $this.hide().prev(),
              video = $video[0];
          $this.next().hide();
          videojs(video, {
            autoplay : true
          });
        }).on('click', '.config', function() {
          var $this = $(this),
              $btns = $('.btns');
          if (!_this.btnsIsVisible) {
            $btns.css('top', '50%');
            _this.btnsIsVisible = true;
          } else {
            $btns.css('top', '100%');
            _this.btnsIsVisible = false;
          }
        });
      },
      addPublicEvent: function() {
        var _this = this;
        $(document).on('click', '#videoCountCtl .ITEM', function() {
          var $this = $(this);
          _this.videoCount = parseInt($this.text());
        }).on('click', '.li-1 .ITEM', function() {
          var $this = $(this);
          $this.addClass('ON').parent().siblings().find('.ITEM').removeClass('ON');
        });
      }
    },
    created: function() {
      var _this = this;
      this.getserverinfo()
        .then(function() {
          return _this.login()
        })
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
          //console.log(arr)

          _this.$nextTick(function() {
            if (nxst.isPc) {
              _this.handlePc();
            } else {
              _this.handleMobile();
            }  
          })                 
        })
    },
    mounted: function() {
      this.addPublicEvent();
    }
  });
})(jQuery);