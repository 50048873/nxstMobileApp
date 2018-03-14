<template>
  <div>
    <ul class="ReservoirDetailMember">
      <li class="line-bottom" v-for="item in reservoirDetailMember">
        <a :href="`tel:${item.mobile}`" class="mobileIcon"><i class="fa fa-phone-square"></i></a>
        <div class="avatar" v-lazy:background-image="item.avatar"></div>
        <div class="info">
          <h3>钱江</h3>
          <p>
            <span>电话：</span>
            <a class="mobile" :href="`tel:${item.mobile}`">{{item.mobile}}</a>
          </p>
          <p>
            <span>职务：</span>
            <span>{{item.role}}</span>
          </p>
          <p>
            <span>岗位职责：</span>
            <span>{{item.duty}}</span>
          </p>
        </div>
      </li>
    </ul>
    <n-loading v-if="!reservoirDetailMember.length"></n-loading>
  </div>
</template>

<script>
import api from '@/assets/js/api'
import {success} from '@/assets/js/config'
export default {
  name: 'ReservoirDetailMember',
  data() {
    return {
      reservoirDetailMember: []
    }
  },
  methods: {
    getReservoirDetailMember() {
      api.getReservoirDetailMember()
        .then((res) => {
          if (res.status === success) {
            this.reservoirDetailMember = res.data
          }
        }, (err) => {
          this.serverErrorTip(err, 'ReservoirDetailMember.vue')
        })
    }
  },
  created() {
    this.getReservoirDetailMember()
  }
}
</script>

<style scoped lang="less">
  @import '../../assets/less/tool.less';
  .ReservoirDetailMember {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 74px;
    left: 0;
    overflow: auto;
    li {
      padding: 15px;
      display: flex;
      .mobileIcon {
        position: absolute;
        top: 15px;
        right: 15px;
        font-size: 42px;
        color: #fba254;
      }
      .avatar {
        flex: 0 0 88px;
        //width: 88px;
        height: 88px;
        border-radius: 50%;
        background-color: #e5e8ea;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
      }
      .info {
        flex: 1;
        margin-left: 15px;
        h3 {
          font-weight: bold;
          padding-bottom: 4px;
        }
        p {
          font-size: 12px;
          line-height: 1.5;
          .mobile {
            color: #1c9ee5;
          }
        }
      }
    }
  }
</style>