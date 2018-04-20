<template>
  <div class="address-book">
    <div class="searchWrap">
      <i class="nxst-search"></i>
      <input type="text" placeholder="搜索">
    </div>
    <div class="memberCount">
      <span>综合部</span>
      <span>200</span>
    </div>
    <address-book-member></address-book-member>
  </div>
</template>

<script>
import AddressBookDepartment from '@/components/AddressBookDepartment'
import AddressBookMember from '@/components/AddressBookMember'
export default {
  name: 'AddressMemberList',
  components: {
    AddressBookDepartment,
    AddressBookMember
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
      margin-bottom: 10px;
    }
  }
</style>