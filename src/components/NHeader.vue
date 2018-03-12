<template>
  <div class="n-header">
    <h2 class="header">
      <i class="fa fa-angle-left extend-click" v-if="isBack" @click="back"></i>
      <em class="title">{{title}}</em>
    </h2>
  </div>
</template>

<script>
export default {
  name: 'NHeader',
  props: {
    title: {
      type: String,
      default: '宁夏水投智慧水务平台'
    },
    isBack: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="less">
  .n-header {
    height: 70px;
    background: url('../assets/img/home-header-bg.jpg') no-repeat;
    background-size: 100% 100%;
    padding-top: 20px;
    box-sizing: border-box;
    .header {
      position: relative;
      text-align: center;
      font-size: 18px;
      color: white;
      line-height: 50px;
      letter-spacing: 1px;
      .fa {
        position: absolute;
        top: 50%;
        left: 15px;
        transform: translateY(-50%);
        font-size: 24px;
        color: white;
      }
      .title {
        font-style: normal;
      }
    }
  }
</style>