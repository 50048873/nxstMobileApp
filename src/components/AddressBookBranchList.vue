<template>
  <div class="address-book-branchlist">
    <div class="searchWrap">
      <i class="nxst-search"></i>
      <input type="text" placeholder="搜索">
    </div>
    <div class="memberCount">
      <span>{{organizationName}}</span>
      <span>200</span>
    </div>
    <ul>
      <template v-for="(item, index) in branchList">
        <router-link class="item" :to="{path:'addressBookMemberList',query:{shortName:encodeURI(item.NAME),bcId:item.ID}}">
          <address-book-department :shortName="item.NAME"></address-book-department>
        </router-link>
     </template>
    </ul>
  </div>
</template>

<script>
import api from '@/assets/js/api'
import {success} from '@/assets/js/config'
import AddressBookDepartment from '@/components/AddressBookDepartment'
export default {
  name: 'AddressBookBranchList',
  components: {
    AddressBookDepartment
  },
  data(){
    return{
      organizationName:"",
      ogId:"",
      branchList:[]
    }
  },
  created(){ 
      this.ogId=this.$route.query.ogId;
      this.organizationName=decodeURI(this.$route.query.shortName);
  },
  beforeMount(){
    if(this.ogId){
      this.getBranchList()
    }else{
      this.hint("参数缺失！")
    }
  },
  methods:{
    getBranchList(){
      return api.getBranchList({organizationId:this.ogId}).then((res)=>{
        if(res.status===success){
          if(!res.data) return
          this.branchList = res.data;
        }else{
          this.hint(res.mes)
        }
      },(err)=>{
        this.serverErrorTip(err, 'AddressBookBranchList.vue')
      })
    }
  }
}
</script>

<style scoped lang="less">
@import '../assets/less/variable.less';
  .address-book-branchlist {
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