<template>
  <div class="reservoir-overview-map">
    <!-- <highcharts-map></highcharts-map> -->
    <n-map></n-map>
  </div>
</template>

<script>
import HighchartsMap from '@/components/reservoirOverview/ReservoirOverviewMap/HighchartsMap'
import NMap from '@/components/reservoirOverview/ReservoirOverviewMap/NMap'

export default {
  name: 'ReservoirOverviewMap',
  components: {
    HighchartsMap,
    NMap
  },
  created() {
    // console.log('map')
    //   this.setDocumentTitle('水库概览')
  }
}
</script>