<template>
  <div class="ReservoirDetailMonitorWaterlevel">
    <h6>日报信息</h6>
    <table class="table">
      <thead>
        <tr>
          <th>
            <p>水位</p>
            <p>(m)</p>
          </th>
          <th>
            <p>库容</p>
            <p>(万m3)</p>
          </th>
          <th>
            <p>降雨量</p>
            <p>(mm)</p>
          </th>
          <th>
            <p>年累计降雨量</p>
            <p>(mm)</p>
          </th>
          <th>
            <p>供水量</p>
            <p>(万m3)</p>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>100</td>
          <td>100</td>
          <td>100</td>
          <td>100</td>
          <td>100</td>
        </tr>
        <tr>
          <td>100</td>
          <td>100</td>
          <td>100</td>
          <td>100</td>
          <td>100</td>
        </tr>
      </tbody>
    </table>
    <h6>九参数水质检测</h6>
    <table class="table">
      <thead>
        <tr>
          <th>项目</th>
          <th>温度</th>
          <th>PH值</th>
          <th>浊度</th>
          <th>溶解氧</th>
          <th>电导率</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>参考值</td>
          <td>30<sup>○</sup>C</td>
          <td>6-9</td>
          <td>NTU</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>测值</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
      <thead>
        <tr>
          <th>项目</th>
          <th>总磷</th>
          <th>总氮</th>
          <th>氨氮</th>
          <th>COD</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>参考值</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>测值</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ReservoirDetailMonitorWaterlevel',
}
</script>

<style scoped lang="less">
  .ReservoirDetailMonitorWaterlevel {
    padding-bottom: 10px;
    h6 {
      padding: 10px;
    }
    .table {
      width: 100%;
      text-align: center;
      background-color: white;
      font-size: 12px;
      th {
        background-color: #1b9ce4;
        color: white;
        line-height: 34px;
        border: 1px solid #d7d7d7;
        padding-top: 10px;
        padding-bottom: 10px;
        &:first-child{
          border-left: none;
        }
        &:last-child {
          border-right: none;
        }
        p {
          line-height: 1.5;
        }
      }
      td {
        border: 1px solid #d7d7d7;
        line-height: 48px;
        &:first-child{
          border-left: none;
        }
        &:last-child {
          border-right: none;
        }
      }
    }
  }
</style>