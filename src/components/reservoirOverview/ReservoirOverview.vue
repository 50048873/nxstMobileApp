<template>
  <div class="reservoir-overview">
    <n-tab :data="tab"></n-tab>
    <transition name="fade">
      <router-view class="router-view-fade"></router-view>
    </transition>
  </div>
</template>

<script>
import NTab from '@/components/base/NTab'
import api from '@/assets/js/api'
import {success} from '@/assets/js/config'
import {mapGetters, mapMutations} from 'vuex'
import {SET_RESERVOIRLIST} from '@/store/mutation-types'
export default {
  name: 'ReservoirOverview',
  components: {
    NTab
  },
  data() {
    return {
      tab: [
        {
          title: '地图',
          path: '/reservoirOverview/map',
          icon: 'nxst-map'
        },
        {
          title: '列表',
          path: '/reservoirOverview/list',
          icon: 'nxst-list'
        }
      ]
    }
  },
  methods: {
    ...mapMutations([SET_RESERVOIRLIST]),
    getReservoirList() {
      api.getReservoirList()
        .then((res) => {
          if (res.status === success) {
            this.SET_RESERVOIRLIST(res.data)
            //console.log(JSON.stringify(res.data, null , 2))
          } else {
            this.hint(res.msg)
          }
        }, (err) => {
          this.serverErrorTip(err, 'ReservoirOverview.vue')
        })
    }
  },
  created() {
      this.setDocumentTitle('水库概览')
      this.getReservoirList()
  }
}
</script>

<style scoped lang="less">
  .reservoir-overview {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
</style>