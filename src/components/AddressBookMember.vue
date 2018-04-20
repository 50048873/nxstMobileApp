<template>
    <li class="line-top line-bottom">
      <div class="nameWrap">
        <span class="portrait"></span>
        <span class="name">{{userName}}</span>
      </div>
      <div class="phone">
        <i class="nxst-phone"></i>
      </div>
    </li>
</template>

<script>
export default {
  name: 'AddressBookDepartmentList',
  props:{
    userName:{
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
      .nameWrap {
        display: inline-flex;
        align-items: center;
        color:#333;
        .portrait {
          display: inline-block;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background-color: #e4e8eb;
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
        }
        .name {
          margin-left: 10px;
        }
      }
      .phone {
        font-size: 28px;
        color: #fba254;
      }
    }
</style>