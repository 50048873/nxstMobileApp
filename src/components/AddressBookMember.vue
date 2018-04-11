<template>
  <ul class="AddressBookDepartmentList">
    <li class="line-top line-bottom">
      <div class="nameWrap">
        <span class="portrait"></span>
        <span class="name">名字</span>
      </div>
      <div class="phone">
        <i class="nxst-phone"></i>
      </div>
    </li>
    <li class="line-bottom">
      <div class="nameWrap">
        <span class="portrait"></span>
        <span class="name">名字</span>
      </div>
      <div class="phone">
        <i class="nxst-phone"></i>
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
      .nameWrap {
        display: inline-flex;
        align-items: center;
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
  }
</style>