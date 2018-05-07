<template>
  <div class="notfound">
      <img :src="notfoundsrc"/>
      <div>系统建设中...</div>
      <button @click="handleBack">返回</button>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  data(){
    return {
      notfoundsrc:require('@/assets/img/404.png')
    }
  },
  methods: {
    handleBack(){
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less">
  .notfound {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 40%;
    div{
      color:#999;
    }
    img{
      width: 25%;
    }
    button{
      margin-top: 10px;
      background-color: #e3e3e3;
      color:#999;
      padding: 2px 10px;
      text-align: center;
      border: 1px solid #ddd;
      border-radius: 6px;
    }
  }
</style>