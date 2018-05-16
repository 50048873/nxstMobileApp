<template>
  <div class="NDialog" v-show="isVisible">
      <div class="weui-mask" @click="close"></div>
        <div class="weui-dialog weui-skin_android">
            <div class="weui-dialog__hd"><strong class="weui-dialog__title">筛查</strong></div>
            <div class="weui-dialog__bd">
              <div class="weui-cell">
                  <div class="weui-cell__hd"><label for="" class="weui-label">开始日期</label></div>
                  <div class="weui-cell__bd">
                      <input class="weui-input" type="date" v-model="startTime">
                  </div>
              </div>
              <div class="weui-cell">
                  <div class="weui-cell__hd"><label for="" class="weui-label">结束日期</label></div>
                  <div class="weui-cell__bd">
                      <input class="weui-input" type="date" v-model="endTime">
                  </div>
              </div>
            </div>
            <div class="weui-dialog__ft">
                <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" @click="close">取消</a>
                <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" @click="confirm">确定</a>
            </div>
        </div>
  </div>
</template>

<script>
import {dateFormat} from '@/assets/js/mixin'
import {get7DayOfcurrentDay} from '@/assets/js/util'
export default {
  name: 'NDialog',
  mixins: [dateFormat],
  data() {
    return {
      isVisible: false,
      startTime: this.dateFormat(get7DayOfcurrentDay(), 'YYYY-MM-DD'),
      endTime: this.dateFormat(new Date(), 'YYYY-MM-DD')
    }
  },
  methods: {
    show() {
      this.isVisible = true
    },
    close() {
      this.isVisible = false
    },
    confirm() {
      let date = {
        startTime: this.startTime,
        endTime: this.endTime
      }
      this.eventHub.$emit('confirm', date)
      this.$emit('confirm', date)
      this.close()
    }
  }
}
</script>

<style scoped lang="less">
  .NDialog {
    
  }
</style>