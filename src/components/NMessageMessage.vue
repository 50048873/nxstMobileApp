<template>
  <ul class="NMessageMessage">
    <li class="line-bottom">
      <div class="iconWrap">
        <i class="fa fa-clock-o" aria-hidden="true"></i>
      </div>
      <div class="attention">
        <h6>预警信息提醒</h6>
        <p>雨量信息信息报告报告报告报告报</p>
      </div>
      <div class="detail">
        <time>12-23 13:00</time>
        <button class="showDetail c-f98149">查看详情</button>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'NMessageMessage'
}
</script>

<style scoped lang="less">
  .NMessageMessage {
    margin-top: 10px;
    background-color: white;
    li {
      display: flex;
      margin-left: 10px;
      padding: 10px 10px 10px 0;

      .iconWrap {
        flex: 0 0 42px;
        height: 42px;
        background-color: #0093dd;
        border-radius: 50%;
        margin-right: 10px;
        position: relative;
        .fa {
          font-size: 30px;
          color: white;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .attention {
        flex: auto;
        overflow-x: hidden;
        p {
          overflow-x: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          color: #b2b1b1;
        }
        
      }
      .detail {
        flex: auto;
        text-align: right;
        time {
          color: #b2b1b1;
        }
        .showDetail {
          display: inline-block;
          padding: 0 10px;
          text-align: center;
          border: 1px solid;
          border-radius: 20px;
          background-color: white;
          &:focus {
            outline: 0;
          }
        }
      }
    }
  }
</style>