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
        $(document).on('click', '.controls', function(e) {
          e.preventDefault();
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
    }
  });
})(jQuery, window);