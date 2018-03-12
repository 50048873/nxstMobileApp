<template>
    <ul class="ReservoirDetailInspection">
      <li class="detail">
        <h3 class="iconWrap">
          <i>图标</i>
          <span>基本信息</span>
        </h3>
        <div class="detail-content">
          <ul>
            <li>
              <span class="name">
                <i>图标</i>
                <em>水库名称</em>
              </span>
              <span class="content">鸭子荡水库鸭子荡水库鸭子荡水库</span>
            </li>
          </ul>
        </div>
      </li>
    </ul>
</template>

<script>
export default {
  name: 'ReservoirDetailInfo'
}
</script>

<style scoped lang="less">
  @import '../../assets/less/tool.less';
  .ReservoirDetailInspection {
    position: absolute;
    top: 70px;
    right: 0;
    bottom: 74px;
    left: 0;
  }
</style>