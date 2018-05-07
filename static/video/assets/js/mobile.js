(function($, win) {
  var isPc = win.nxst.isPc,
      mixins = win.nxst.mixins,
      host = win.nxst.host,
      url = win.nxst.url;

  new Vue({
    el: '#videoWrap',
    data: function() {
      return {
        channels: [],
        volumnValue: 10,
        type: "application/x-mpegURL"
      }
    },
    mixins: [mixins],
    computed: {
      channelsByVideoCount: function() {
        return this.channels
      },
      getVedioLayoutClass: function() {
        return ''
      },
      videoParentContainerHeight: function() {
        return {
          width: '100%',
          height: ((window.innerWidth - 15 * 2) * 9 / 16) + 'px'
        }
      }
    },
    methods: {
      getOnlineText: function(status) {
        return status == 1 ? '在线' : '离线'
      },
      getOnlineClass: function(status) {
        return status == 1 ? 'green' : ''
      },
      handleMobile: function() {
        $(document).on('click', '.controls', function() {
          var $this = $(this),
              $video = $this.parent().prev(),
              video = $video[0];
          $this.hide().next().hide();
          videojs(video, {
            autoplay : true
          });
        }).on('click', '.config', function() {
          $('.btns').toggleClass('ON');
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
              var data = {
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
              var token = $.cookie("token");
              console.log(token)
              return $.ajax({
                type: "GET",
                url: host + url + "/setchannelconfig",
                data: data,
                headers: {
                    token: token
                },
                beforeSend: function (XMLHttpRequest) {
                  console.log(111)
                  XMLHttpRequest.setRequestHeader(token, token);
                },
                success: function(data) {
                  console.log(data)
                  return
                }
              })
            })
            .then(function() {
              return _this.getchannels()
            })
            .then(function(res) {
              console.log(res)
              return _this.getchannelstream(res)
            })
            .then(function(res) {
              var len = _this.channels.length,
                  arr = [];
              for (var i = 0; i < len; i++) {
                arr[i] = $.extend({}, _this.channels[i], res[i])
              }
              _this.channels = arr;
              console.log(arr)

              _this.$nextTick(function() {
                if (isPc) {
                  _this.handlePc();
                } else {
                  _this.handleMobile();
                }  
              })                 
            })
    }
  });
})(jQuery, window);