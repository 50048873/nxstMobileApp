<template>
  <div class="address-book-memberlist">
    <div class="searchWrap">
      <i class="nxst-search"></i>
      <input type="text" placeholder="搜索">
    </div>
    <div class="memberCount">
      <span>{{branchName}}</span>
      <span>200</span>
    </div>
    <ul>
      <template v-for="(item, index) in memberList">
        <a :href="'tel:'+item.TELEPHONE">
          <address-book-member :userName="item.NAME"></address-book-member>
        </a>
     </template>
    </ul>
  </div>
</template>

<script>
import api from '@/assets/js/api'
import {success} from '@/assets/js/config'
import AddressBookMember from '@/components/AddressBookMember'
export default {
  name: 'AddressBookMemberList',
  components: {
    AddressBookMember
  },
  data(){
    return{
      branchName:"",
      bcId:"",
      memberList:[]
    } 
  },
  created(){
    this.bcId = this.$route.query.bcId;
    this.branchName = decodeURI(this.$route.query.shortName)
  },
   beforeMount(){
    if(this.bcId){
      this.getMemberList()
    }else{
      this.hint("参数缺失！")
    }
  },
   methods:{
    getMemberList(){
      return api.getMemberList({id:this.bcId}).then((res)=>{
        if(res.status===success){
          if(!res.data) return
          this.memberList = res.data;
        }else{
          this.hint(res.mes)
        }
      },(err)=>{
        this.serverErrorTip(err, 'AddressBookMemberList.vue')
      })
    }
  }
}
</script>

<style scoped lang="less">
 @import '../assets/less/variable.less';
  .address-book-memberlist {
    position: absolute;
    top: 0;
    bottom: @tab-height;
    padding-bottom: @tab-height;
    width: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    -moz-overflow-scrolling: touch;
    -ms-overflow-scrolling: touch;
    -o-overflow-scrolling: touch;
    overflow-scrolling: touch;
    .searchWrap {
      position: relative;
      margin: 10px;
      .nxst-search {
        position: absolute;
        top: 50%;
        left: 15px;
        transform: translateY(-50%);
      }
      input {
        display: block;
        width: 100%;
        background-color: #dcdcdc;
        border-radius: 20px;
        line-height: 28px;
        padding-left: 3em;
        box-sizing: border-box;
      }
    }
    .memberCount{
      background-color: #fff;
      padding:5px 10px;
      display:flex;
      justify-content: space-between;
      color:#065dbc;
    }
  }
</style>