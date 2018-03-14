<template>
  <div class="ReservoirDetailInspectionAdd">
    <form>
      <div class="item line-bottom">
        <h6>签到点</h6>
        <div class="inputBox">
          <label for="yhd">
            <span class="iconWrap">
              <input type="radio" name="qdd" id="yhd" value="yhd" checked="checked">
              <i class="fa fa-circle"></i>
            </span>
            <span>溢洪道</span>
          </label>
          <label for="db">
            <span class="iconWrap">
              <input type="radio" name="qdd" id="db" value="db">
              <i class="fa fa-circle"></i>
            </span>
            <span>大坝</span>
          </label>
          <label for="lsy">
            <span class="iconWrap">
              <input type="radio" name="qdd" id="lsy" value="lsy">
              <i class="fa fa-circle"></i>
            </span>
            <span>量水堰</span>
          </label>
        </div>
      </div>
      <div class="item line-bottom">
        <h6>巡查部位</h6>
        <div class="inputBox">
          <div class="weui-cell__bd">
            <select class="weui-select" name="select1">
              <option selected="selected" value="1">坝顶1</option>
              <option value="2">坝顶2</option>
              <option value="3">坝顶3</option>
            </select>
          </div>
        </div>
      </div>
      <div class="item line-bottom">
        <h6>巡查时间</h6>
        <div class="inputBox">
          <div class="weui-cell__bd">
            <input class="weui-input" type="datetime-local" step="1" v-model="datetime">
            <span>{{datetime | dateFormat('yyyy-mm-dd HH:MM:ss')}}</span>
          </div>
        </div>
      </div>
      <div class="item line-bottom">
        <h6>巡查状态</h6>
        <div class="inputBox">
          <label for="normal">
            <span class="iconWrap">
              <input type="radio" name="xczt" id="normal" value="normal" checked="checked">
              <i class="fa fa-circle"></i>
            </span>
            <span>正常</span>
          </label>
          <label for="abnormal">
            <span class="iconWrap">
              <input type="radio" name="xczt" id="abnormal" value="abnormal">
              <i class="fa fa-circle"></i>
            </span>
            <span>异常</span>
          </label>
        </div>
      </div>
      <div class="condition">
        <h6>情况说明</h6>
        <textarea class="weui-textarea" placeholder="请输入检查情况"></textarea>
        <p class="explain">至少10个字符</p>
      </div>
    </form>
  </div>
</template>

<script>
import {dateFormat} from '@/assets/js/mixin'
export default {
  name: 'ReservoirDetailInspectionAdd',
  mixins: [dateFormat],
  data() {
    return {
      datetime: this.getDefaultDateTime()
    }
  },
  methods: {
    getDefaultDateTime() {
      let datetime = this.dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss').split(' ').join('T')
      return datetime
    }
  }
}
</script>

<style scoped lang="less">
  .ReservoirDetailInspectionAdd {
    form {
      overflow-x: hidden;
      color: #6c6c6c;
      .item {
        display: flex;
        padding: 18px 10px;
        background-color: white;
        height: 20px;
        line-height: 20px;
        .inputBox {
          flex: 1;
          text-align: right;
          label {
            margin-left: 20px;
            .iconWrap {
              margin-right: 4px;
              .fa-circle {
                color: #d7d7d7;
                font-size: 16px;
              }
              input {
                position: absolute;
                left: -9999em;
                &:checked + .fa-circle {
                  color: #10d67b;
                }
              }
            }
          }
        }
        .weui-cell__bd {
          padding-right: 15px;
          padding-left: 15px;
          &:after {
            content: " ";
            height: 6px;
            width: 6px;
            border-width: 2px 2px 0 0;
            border-color: #C8C8CD;
            border-style: solid;
            transform-origin: right center;
            transform: rotate(45deg);
            position: absolute;
            top: 50%;
            right: 10px;
            margin-top: -2px;
          }
          .weui-select {
            -webkit-appearance: none;
            border: 0;
            outline: 0;
            background-color: transparent;
            position: relative;
            z-index: 1;
          }
          .weui-input {
            border: 0;
            outline: 0;
            -webkit-appearance: none;
            background-color: transparent;
            position: absolute;
            z-index: 1;
            opacity: 0;
          }
        }
      }
      .condition {
        margin: 10px;
        h6 {
          line-height: 1.5;
        }
        .weui-textarea {
            display: block;
            border: 0;
            resize: none;
            width: 100%;
            height: 112px;
            outline: 0;
            padding: 6px;
            box-sizing: border-box;
            &::-webkit-input-placeholder {
              color: #babbbb;
            }
        }
        .explain {
          text-align: right;
          line-height: 2;
          font-size: 10px;
        }
      }
    }
  }
</style>