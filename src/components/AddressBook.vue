<template>
  <div class="address-book">
    <div class="searchWrap">
      <i class="nxst-search"></i>
      <input type="text" placeholder="搜索">
    </div>
    <ul>
      <template v-for="(item, index) in organizationList">
        <router-link class="item" :to="{path:'addressBookBranchList',query:{shortName:encodeURI(item.SHORT_NAME),ogId:item.ID}}">
          <address-book-department :shortName="item.SHORT_NAME"></address-book-department>
        </router-link>
      </template>
    </ul>
    <h6>最近联系的人</h6>
    <address-book-member></address-book-member>
  </div>
</template>

<script>
import api from '@/assets/js/api'
import {success} from '@/assets/js/config'
import AddressBookDepartment from '@/components/AddressBookDepartment'
import AddressBookMember from '@/components/AddressBookMember'
export default {
  name: 'AddressBook',
  components: {
    AddressBookDepartment,
    AddressBookMember
  },
  data(){
    return{
      organizationList:[]
    }
  },
  created(){
    this.getOrganizationList()
  },
  methods:{
    getOrganizationList(){
      api.getOrganizationList().then((res)=>{
        if(res.status===success){
          if(!res.data) return
          this.organizationList = res.data
        }else{
          this.hint(res.mes)
        }
      },(err)=>{
        this.serverErrorTip(err, 'AddressBook.vue')
      })
    }
  }
}
</script>

<style scoped lang="less">
  @import '../assets/less/variable.less';
  .address-book {
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
    h6 {
      line-height: 38px;
      text-indent: 10px;
    }
  }
</style>