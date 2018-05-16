(function($, win) {
  var isPc = win.nxst.isPc,
      players = win.nxst.players, 
      mixins = win.nxst.mixins,
      throttle = win.nxst.utils.throttle;

  new Vue({
    el: '#videoWrap',
    data: function() {
      return {
        channels: [],
        videoCount: 4,
        volumnValue: 10,
        type: "rtmp/mp4"
      }
    },
    mixins: [mixins],
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
            res.push(obj);
          }
        } else if (res.length > this.videoCount) {
          res = this.channels.slice(0, this.videoCount);
        }
        return res
      },
      getVedioLayoutClass: function() {
        var col = '';
        switch (this.videoCount) {
          case 1:
            col = 'col-md-12';
            break;
          case 4:
            col = 'col-md-6';
            break;
          case 9:
            col = 'col-md-4';
            break;
          case 16:
            col = 'col-md-3';
            break;
        }
        return col
      },
      videoParentContainerHeight: function() {
        if (isPc) {
          return ''
        }
      }
    },
    methods: {
      playAll: function() {
        var _this = this;
        var videos = document.querySelectorAll('.video-js'),
            i = 0, 
            len = videos.length;
        while (i < len) {
          (function(i) {
            var video = videos[i],
                sourceSrc = $(video).find('source').attr('src');
            if (sourceSrc) {
              videojs(video, {
                notSupportedMessage : '您的浏览器没有安装或开启Flash,戳我开启！',
                techOrder : ["html5","flash"],
                autoplay : false,
                controls: true,
                defaultVolume: 100
              }, function() {
                players.push(this);
                this.play();
                this.on('loadedmetadata', function() {
                  _this.$set(_this.channels[i], 'isSuccessedPlay', true);
                });
              });
            }
          })(i);
          i++;
        }
      },
      startAll: function() {
        $('.video-js').css('opacity', 1);
      },
      stopAll: function() {
        $('.video-js').css('opacity', 0);
      },
      handlePcEvent: function() {
        if (!this.channels.length) return;
        var _this  = this;
        $(document).on('click', '#fold', function() {
          var $this = $(this),
              $btns = $('.btns');
          $this.find('i').toggleClass('sj-r sj-l');
          $btns.toggleClass('OFF');
        }).on('click', '#allStart', function() {
          _this.startAll();
        }).on('click', '#allStop', function() {
          _this.stopAll();
        }).on('click', '#videoCountCtl .ITEM', function() {
          var $this = $(this),
              oldVideoCount = _this.videoCount,
              currentCount = parseInt($this.text());
          _this.videoCount = currentCount;
          if (currentCount < oldVideoCount) {
            var i = currentCount,
                len = oldVideoCount,
                player = null;
            while ( i < len ) {
              player = players[i];
              if (player) {
                player.dispose();
              }
              i++;
            }
            players.length = currentCount;
          } else {
            _this.$nextTick(function() {
              _this.playAll();
            });
          }
          _this.resizeVideoSize();
        }).on('click', '#gl .ITEM:not(.DISABLE)', function() {
          var $this = $(this);
          $this.addClass('ON').parent().siblings().find('.ITEM').removeClass('ON');
        }).on('click', '#yt .ITEM', function() {
          var $this = $(this);
          if (_this.currentIndex === -1) {
            _this.showDialog('请先选择要调整的视频！');
            return;
          }
          var protocol = _this.channelsByVideoCount[_this.currentIndex].Protocol,
              isSuccessedPlay = _this.channelsByVideoCount[_this.currentIndex].isSuccessedPlay,
              hasVideo = _this.channelsByVideoCount[_this.currentIndex].URL;

          if (!hasVideo) {
            // _this.showDialog('无视频，请先配置视频通道！');
            return;
          }
          if (protocol === 'ONVIF' && !isSuccessedPlay) {
            // _this.showDialog('此视频的云台连接失败！');
            return;
          } 
          if (protocol !== 'ONVIF' && isSuccessedPlay) {
            // _this.showDialog('此视频不支持云台功能！');
            return;
          }
          
          console.log(_this.channelsByVideoCount);
        });

        nxst.utils.addFullScreenEventListener('#fullScreen', '#videoWrap');
      },
      handlePc: function() {
        this.playAll();
        this.handlePcEvent();
      },
      resizeVideoSize: function() {
        this.$nextTick(function() {
          $('.video-wrapper').css('padding-bottom', $('.videoItem').height() + 'px');
        });
      },
      addResizeVideoSizeEvent: function() {
        var _this = this;
        $(window).resize(function() {
          throttle(_this.resizeVideoSize, this);
        });
      }
    },
    mounted: function() {
      this.resizeVideoSize();
      this.addResizeVideoSizeEvent();
    }
  });
})(jQuery, window);