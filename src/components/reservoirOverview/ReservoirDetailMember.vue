<template>
  <div>
    <ul class="ReservoirDetailMember">
      <li class="line-bottom" v-for="item in reservoirDetailMember">
        <a :href="`tel:${item.phone}`" class="mobileIcon"><i class="nxst-phone"></i></a>
        <div class="avatar" v-lazy:background-image="item.imgUrl"></div>
        <div class="info">
          <h3>{{item.name}}</h3>
          <p>
            <span>电话：</span>
            <a class="phone" :href="`tel:${item.phone}`">{{item.phone}}</a>
          </p>
          <p>
            <span>职务：</span>
            <span>{{item.job}}</span>
          </p>
          <p>
            <span>岗位职责：</span>
            <span>{{item.postDuties}}</span>
          </p>
        </div>
      </li>
    </ul>
    <no-data v-if="!this.reservoirDetailMember || !reservoirDetailMember.length"></no-data>
  </div>
</template>

<script>
import api from '@/assets/js/api'
import {success} from '@/assets/js/config'
// 暂时用王忠燕本机的图片资源，等服务器上有图片时再切换
const baseUrl = 'http://10.100.50.170:8080/znb/'
export default {
  name: 'ReservoirDetailMember',
  data() {
    return {
      reservoirDetailMember: []
    }
  },
  methods: {
    recursion(arr) {
      var result = []
      var getData = function fn(arr) {
        arr.forEach((item) => {
          let obj = {}
          for (let i in item) {
            if (i !== 'childrens') {
              if (i === 'imgUrl') {
                let url = item[i]
                if (url) { 
                  if (url.indexOf('\\') > 1) {
                    url = url.replace(/\\/g, '/')
                  }
                  obj[i] = baseUrl + url
                }
              } else {
                obj[i] = item[i]
              }
            }
          }
          result.push(obj)
          if (item.childrens && item.childrens.length) {
            fn(item.childrens)
          }
        })
      }
      getData(arr)
      return result
    },
    getReservoirDetailMember() {
      api.getReservoirDetailMember({pid: this.$route.query.pid})
        .then((res) => {
          if (res.status === success) {
            this.reservoirDetailMember = this.recursion(res.data)
          } else {
            this.hint(res.msg)
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
  @import '../../assets/less/variable.less';
  .ReservoirDetailMember {
    position: absolute;
    top: 0;
    right: 0;
    bottom: @footer-height;
    left: 0;
    overflow-y: auto;
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
          .phone {
            color: #1c9ee5;
          }
        }
      }
    }
  }
</style>