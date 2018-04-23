<template>
  <div>
    <transition name="fade">
      <keep-alive>
        <router-view class="router-view-fade"></router-view>
      </keep-alive>
    </transition>
    <n-footer :data="data" :pid="$route.query.pid"></n-footer>
  </div>
</template>

<script>
import * as session from '@/assets/js/session'
import {documentTitle_reservoirDetail} from '@/assets/js/config'
import api from '@/assets/js/api'
import {success, ON} from '@/assets/js/config'
import {mapGetters, mapMutations, mapActions} from 'vuex'
let data = [
  {
    title: '信息',
    icon: 'nxst-info',
    href: '/reservoirDetail/info'
  },
  {
    title: '监测',
    icon: 'nxst-jc',
    href: '/reservoirDetail/monitor'
  },
  {
    title: '返回',
    icon: 'nxst-back',
    href: '/reservoirOverview/map'
  },
  {
    title: '巡检',
    icon: 'nxst-xj',
    href: '/reservoirDetail/inspection'
  },
  {
    title: '人员',
    icon: 'nxst-member',
    href: '/reservoirDetail/member'
  }
]
export default {
  name: 'ReservoirOverviewDetail',
  data() {
    return {
      data: data
    }
  },
  methods: {
    ...mapActions([
      'saveFilePathUrl'
    ]),
    initBack() {
      let routers = session.getItem('routers');
      if (routers && routers.indexOf(',')) {
        let originHrefArr = routers.split(','),
        originHref = originHrefArr[originHrefArr.length - 2]
        data[2].href = originHref
      } 
    },
    getFilePathUrl() {
      api.getFilePathUrl()
        .then((res) => {
          if (res.status === success) {
            if (res.data && res.data.filePathUrl) {
              this.saveFilePathUrl(res.data.filePathUrl)
            }
          } else {
            this.hint(res.msg)
          }
        }, (err) => {
          this.serverErrorTip(err, 'ReservoirDetail.vue')
        })
    }
  },
  created() {
    this.initBack()
    this.setDocumentTitle(session.getItem(documentTitle_reservoirDetail))
    this.getFilePathUrl()
  },
  watch: {  
    '$route'(to, from)  {  
      let toPath = to.path
      if (toPath.indexOf('inspection/add') === -1) {
        let documentTitle = session.getItem(documentTitle_reservoirDetail)
        documentTitle && this.setDocumentTitle(documentTitle)
      }
    }  
  }
}
</script>