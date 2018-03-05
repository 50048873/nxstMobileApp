<template>
  <div class="n-dialog-loading">
    <div class="dialogWrap">
      <div class="dialog">
        <div class="progress">
          <i class="fa fa-spinner fa-pulse"></i>
        </div>
        <div class="textTip">请您耐心等待，在玩命加载中...</div>
      </div>
      <div class="close">
        <i class="nxst-close"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NDialogLoading'
}
</script>

<style scoped lang='less'>
  @import '../assets/less/variable.less';
  .n-dialog-loading {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    text-align: center;
    .dialogWrap {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .dialog {
        width: 244px;
        padding: 20px 0;
        background-color: white;
        border-radius: 4px;
        .progress {
          margin-bottom: 20px;
          .fa-spinner {
            font-size: 80px;
            color: @color-theme;
          }
        }
        .textTip {
          font-size: 12px;
        }
      }
      .close {
        margin-top: 15px;
        .nxst-close {
          font-size: 30px;
          color: white;
        }
      }
    }
  }
</style>