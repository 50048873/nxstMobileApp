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
import {handleAuth} from '@/assets/js/util'

let dataArr = [
  {
    title: '信息',
    icon: 'nxst-info',
    href: '/reservoirDetail/info',
    flag:true
  },
  {
    title: '监测',
    icon: 'nxst-jc',
    href: '/reservoirDetail/monitor',
    flag:false
  },
  {
    title: '返回',
    icon: 'nxst-back',
    href: '/reservoirOverview/map',
    flag:true
  },
  {
    title: '巡检',
    icon: 'nxst-xj',
    href: '/reservoirDetail/inspection',
    flag:false//
  },
  {
    title: '人员',
    icon: 'nxst-member',
    href: '/reservoirDetail/member',
    flag:false//handleAuth("member")
  }
]
export default {
  name: 'ReservoirOverviewDetail',
  data() {
    return {
      data: dataArr
    }
  },
  methods: {
    initBack() {
      let routers = session.getItem('routers');
      if (routers && routers.indexOf(',')) {
        let originHrefArr = routers.split(','),
        originHref = originHrefArr[originHrefArr.length - 2]
        dataArr[2].href = originHref
      } 
    }
  },
  created() {
    this.data[1].flag = handleAuth("check")
    this.data[3].flag = handleAuth("tour")
    this.data[4].flag = handleAuth("member")
    this.initBack()
    this.setDocumentTitle(session.getItem(documentTitle_reservoirDetail))
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