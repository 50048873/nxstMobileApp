<template>
  <div class="NDialog" v-show="isVisible">
      <div class="weui-mask" @click="close"></div>
        <div class="weui-dialog weui-skin_android">
            <div class="weui-dialog__hd"><strong class="weui-dialog__title">筛查</strong></div>
            <div class="weui-dialog__bd">
              <div class="weui-cell">
                  <div class="weui-cell__hd"><label class="weui-label" for="startTime">开始时间：</label></div>
                  <div class="weui-cell__bd">
                      <!-- <label class="label" for="startTime">{{startTime | dateFormat("yyyy-mm-dd HH:MM:ss")}}</label> -->
                      <input class="weui-input" id="startTime" :type="inputType" step="1" v-model="startTime">
                  </div>
              </div>
              <div class="weui-cell">
                  <div class="weui-cell__hd"><label for="endTime" class="weui-label">结束时间：</label></div>
                  <div class="weui-cell__bd">
                      <!-- <label class="label" for="endTime">{{endTime | dateFormat("yyyy-mm-dd HH:MM:ss")}}</label> -->
                      <input id="endTime" class="weui-input" :type="inputType" step="1" v-model="endTime" required>
                  </div>
              </div>
              <div class="weui-cell weui-cell_select">
                  <div class="weui-cell__bd">
                      <select class="weui-select" name="select1" v-model="type" required>
                          <option selected="">类型</option>
                          <option value="0">小时</option>
                          <option value="1">日</option>
                          <option value="2">月</option>
                          <option value="3">年</option>
                      </select>
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
import {getSameDayOfPreMonth, get7DayOfcurrentDay, getNewYearDay, get8am} from '@/assets/js/util'
/*
  * 按时：早8点到当前时间
  * 按日：前推7天
  * 按月：前推一月
  * 按年：当年
  * startTime: this.dateFormat(getSameDayOfPreMonth(new Date()), "yyyy-mm-dd'T'HH:MM:ss"),
*/
export default {
  name: 'NDialog',
  mixins: [dateFormat],
  data() {
    return {
      isVisible: false,
      inputType: 'date',
      type: '2',
      startTime: this.dateFormat(getSameDayOfPreMonth(new Date()), "YYYY-MM-DD"),
      endTime: this.dateFormat(new Date(), "YYYY-MM-DD")
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
        type: this.type,
        startTime: this.startTime,
        endTime: this.endTime
      }
      this.eventHub.$emit('confirm', date)
      this.$emit('confirm', date)
      this.close()
    }
  },
  watch: {
    type(newVal, oldVal) {
      switch (newVal) {
        case '0' :
          this.inputType = 'datetime-local'
          this.startTime = this.dateFormat(get8am(new Date()), "YYYY-MM-DD hh:mm:ss"),
          this.endTime = this.dateFormat(new Date(), "YYYY-MM-DD hh:mm:ss")
          break
        case '1' :
          this.inputType = 'date'
          this.startTime = this.dateFormat(get7DayOfcurrentDay(), "YYYY-MM-DD")
          this.endTime = this.dateFormat(new Date(), "YYYY-MM-DD")
          break
        case '2' :
          this.inputType = 'date'
          this.startTime = this.dateFormat(getSameDayOfPreMonth(), "YYYY-MM-DD")
          this.endTime = this.dateFormat(new Date(), "YYYY-MM-DD")
          break
        case '3' :
          this.inputType = 'date'
          this.startTime = this.dateFormat(getNewYearDay(), "YYYY-MM-DD")
          this.endTime = this.dateFormat(new Date(), "YYYY-MM-DD")
          break
        default : 
          this.inputType = 'date'
      } 
    }
  }
}
</script>

<style scoped lang="less">
  .NDialog {
    .weui-cell {
      display: block;
    }
    .weui-cell__hd, .weui-cell__bd {
      line-height: 1.5;
    }
    .weui-cell__bd {
      position: relative;
    }
    // .label {
    //   position: absolute;
    //   color: red;
    // }
    .weui-cell_select .weui-cell__bd:after {
        right: 0;
    }
    .weui-input {
      margin-left: -4px;
    }
  }
</style>