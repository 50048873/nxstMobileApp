<template>
    <ul class="ReservoirDetailInspection">
      <li class="outList line-bottom">
        <h3 class="iconWrap" :style="{color: colors[0]}">
          <i>图标</i>
          <span>基本信息</span>
        </h3>
        <ul class="childrenWrap childrenWrap-1">
          <li>
            <span class="name">
              <i>图标</i>
              <em>水库名称</em>
            </span>
            <span class="content">{{reservoirDetailInfo.ennm}}</span>
          </li>
          <li>
            <span class="name">
              <i>图标</i>
              <em>工程规模</em>
            </span>
            <span class="content">{{reservoirDetailInfo.gcgm | gcgmFilter}}</span>
          </li>
          <li>
            <span class="name">
              <i>图标</i>
              <em>东经</em>
            </span>
            <span class="content">{{reservoirDetailInfo.lgtd}}</span>
          </li>
          <li>
            <span class="name">
              <i>图标</i>
              <em>北纬</em>
            </span>
            <span class="content">{{reservoirDetailInfo.lttd}}</span>
          </li>
          <li>
            <span class="name">
              <i>图标</i>
              <em>所在地</em>
            </span>
            <span class="content">{{reservoirDetailInfo.dmstatpl}}</span>
          </li>
          <li>
            <span class="name">
              <i>图标</i>
              <em>管理单位</em>
            </span>
            <span class="content">{{reservoirDetailInfo.adunnm}}</span>
          </li>
        </ul>
      </li>
      <li class="outList line-top line-bottom">
        <h3 class="iconWrap" :style="{color: colors[1]}">
          <i>图标</i>
          <span>水文水库特征</span>
        </h3>
        <ul class="childrenWrap childrenWrap-2">
          <li>
            <span class="name">
              <i>图标</i>
              <em>总库容（亿m<sup>3</sup>）</em>
            </span>
            <span class="content">{{reservoirDetailInfo.ttst}}</span>
          </li>
          <li>
            <span class="name">
              <i>图标</i>
              <em>坝顶高程（m）</em>
            </span>
            <span class="content">{{reservoirDetailInfo.wetpht}}</span>
          </li>
          <li>
            <span class="name">
              <i>图标</i>
              <em>最大坝高（m）</em>
            </span>
            <span class="content">{{reservoirDetailInfo.zdbg}}</span>
          </li>
          <li>
            <span class="name">
              <i>图标</i>
              <em>坝长（m）</em>
            </span>
            <span class="content">{{reservoirDetailInfo.bdzcd}}</span>
          </li>
          <li>
            <span class="name">
              <i>图标</i>
              <em>防洪限制水位（m）</em>
            </span>
            <span class="content">{{reservoirDetailInfo.zxzsw}}</span>
          </li>
          <li>
            <span class="name">
              <i>图标</i>
              <em>设计洪水位（m）</em>
            </span>
            <span class="content">{{reservoirDetailInfo.dsfllv}}</span>
          </li>
          <li>
            <span class="name">
              <i>图标</i>
              <em>校核洪水位（m）</em>
            </span>
            <span class="content">{{reservoirDetailInfo.chfllv}}</span>
          </li>
        </ul>
      </li>
    </ul>
</template>

<script>
import api from '@/assets/js/api'
import {success, documentTitle_reservoirDetail} from '@/assets/js/config'
import * as session from '@/assets/js/session'
import {gcgmFilter} from '@/assets/js/mixin'
let colors = ['#0c6ac9', '#1ca6ab']
export default {
  name: 'ReservoirDetailInfo',
  mixins: [gcgmFilter],
  data() {
    return {
      reservoirDetailInfo: {},
      colors: colors
    }
  },
  methods: {
    getReservoirDetailInfo() {
      api.getReservoirDetailInfo({pid: this.$route.query.pid})
        .then((res) => {
          if (res.status === success) {
            if (!res.data) return
            this.reservoirDetailInfo = res.data
            const documentTitle = this.reservoirDetailInfo.ennm
            this.setDocumentTitle(documentTitle)
            session.setItem(documentTitle_reservoirDetail, documentTitle)
          } else {
            this.hint(res.msg)
          }
        }, (err) => {
          this.serverErrorTip(err, 'ReservoirDetailInfo.vue')
        })
    }
  },
  created() {
    this.getReservoirDetailInfo()
  }
}
</script>

<style scoped lang="less">
  @import '../../assets/less/variable.less';
  .ReservoirDetailInspection {
    position: absolute;
    top: 0;
    right: 0;
    bottom: @footer-height;
    left: 0;
    overflow-y: auto;
    .outList {
      margin-bottom: 12px;
      background-color: white;
      .iconWrap {
        font-size: 16px;
        line-height: 60px;
        padding: 0 10px;
        position: relative;
        &:after { 
          content: " ";
          position: absolute;
          right: 0;
          left: 0;
          bottom: 0;
          height: 1px;
          border-bottom: 1px solid;
          -webkit-transform-origin: 0 100%;
          transform-origin: 0 100%;
          -webkit-transform: scaleY(0.5);
          transform: scaleY(0.5);
        }
      }
  
      .childrenWrap {
        padding: 10px 30px;
        li {
          display: inline-flex;
          width: 100%;
          line-height: 2;
          .name {
            color: #818080;
            white-space: nowrap;
            overflow-x: hidden;
            text-overflow: ellipsis;
            margin-right: 2em;
            //flex: 0 0 9em;
            em {
              font-style: normal;
            }
          }
          .content {
            flex: 1;
            color: @color-text;
          }
        }
      }
      .childrenWrap-1 {
        li {
          .name {
            flex: 0 0 7em;
          }
        }
      }
      .childrenWrap-2 {
        li {
          .name {
            flex: 0 0 12em;
          }
        }
      }
    }
  }
</style>