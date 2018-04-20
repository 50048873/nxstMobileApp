<template>
  <div class="address-book">
    <div class="searchWrap">
      <i class="nxst-search"></i>
      <input type="text" placeholder="搜索">
    </div>
    <div class="memberCount">
      <span>职能部门</span>
      <span>200</span>
    </div>
    <router-link class="item" to="/home/addressMemberList">
      <address-book-department></address-book-department>
    </router-link>
  </div>
</template>

<script>
import AddressBookDepartment from '@/components/AddressBookDepartment'
export default {
  name: 'AddressBranchList',
  components: {
    AddressBookDepartment
  }
}
</script>

<style scoped lang="less">
  .address-book {
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