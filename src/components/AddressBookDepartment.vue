<template>
  <ul class="AddressBookDepartmentList">
    <li class="line-top line-bottom">
      <div>职能部门</div>
      <div class="memberCount">
        <span>200</span>
        <span class="arrow-r"></span>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'AddressBookDepartmentList'
}
</script>

<style scoped lang="less">
  .AddressBookDepartmentList {
    li {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      background-color: white;
      color:#333;
      .memberCount {
       flex: 1;
       text-align: right;
       .arrow-r {
        padding-left: 10px;
       }
      }
    }
  }
</style>