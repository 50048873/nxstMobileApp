<template>
  <div>
    <ul class="ReservoirDetailInspection">
      <li class="line-bottom" v-for="item in ReservoirDetailInspection">
        <time class="title">{{item.date}}</time>
        <div class="content">
          <div class="status">
            <i :class="item.status ? 'nxst-zc' : 'nxst-yc'"></i>
          </div>
          <p>
            <span>巡查时间：</span>
            <time>{{item.date}}</time>
          </p>
          <p>
            <span>巡查结果：</span>
            <span>{{item.result}}</span>
          </p>
        </div>
      </li>
    </ul>
    <n-add top="430" left="18"></n-add>
  </div>
</template>

<script>
import NAdd from '@/components/base/NAdd'
import api from '@/assets/js/api'
import {success} from '@/assets/js/config'
import {mapGetters, mapMutations} from 'vuex'
export default {
  name: 'ReservoirDetailInspection',
  components: {
    NAdd
  },
  data() {
    return {
      ReservoirDetailInspection: []
    }
  },
  computed: {
    ...mapGetters(['documentTitle'])
  },
  methods: {
    getReservoirDetailInspection() {
      api.getReservoirDetailInspection()
        .then((res) => {
          if (res.status === success) {
            this.ReservoirDetailInspection = res.data
          }
        }, (err) => {
          this.serverErrorTip(err, 'ReservoirDetailInspection.vue')
        })
    },
    add() {
      this.$router.push('/reservoirDetail/inspection/add')
    }
  },
  created() {
    this.getReservoirDetailInspection()
    this.eventHub.$on('add', this.add)
    this.setDocumentTitle(this.documentTitle)
  }
}
</script>

<style scoped lang="less">
  .ReservoirDetailInspection {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 74px;
    left: 0;
    overflow: auto;
    li {
      margin-bottom: 10px;
      .title {
        display: block;
        line-height: 32px;
        background-color: #d0eaf9;
        padding: 0 10px;
        font-weight: bold;
      }
      .content {
        position: relative;
        background-color: white;
        padding: 10px 70px 10px 10px;
        font-size: 12px;
        .status {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 10px;
          i {
            font-size: 44px;
          }
        }
        p {
          line-height: 2;
          padding-left: 5em;
          text-indent: -5em;
        }
      }
    }
  }
</style>