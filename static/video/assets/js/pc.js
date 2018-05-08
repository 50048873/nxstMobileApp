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
          return {
            width: '100%',
            height: '100%'
          }
        }
      }
    },
    methods: {
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
              this.on("error",function(e){
                console.log('error')
              });
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
          videojs(video, {
            notSupportedMessage : '您的浏览器没有安装或开启Flash, 戳我开启！',
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
          _this.playAll();
        }).on('click', '#allStop', function() {
          _this.stopAll();
        }).on('click', '#videoCountCtl .ITEM', function() {
          var $this = $(this);
          _this.videoCount = parseInt($this.text());
          _this.resizeVideoSize();
        }).on('click', '.li-1 .ITEM:not(.DISABLE)', function() {
          var $this = $(this);
          $this.addClass('ON').parent().siblings().find('.ITEM').removeClass('ON');
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