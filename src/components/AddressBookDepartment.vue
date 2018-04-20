<template>
    <li class="line-top line-bottom">
      <div>{{shortName}}</div>
      <div class="memberCount">
        <span>200</span>
        <span class="arrow-r"></span>
      </div>
    </li>
</template>

<script>
export default {
  name: 'AddressBookDepartmentList',
  props:{
    shortName:{
      type:String,
      default:""
    }
  }
}
</script>

<style scoped lang="less">
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
</style>