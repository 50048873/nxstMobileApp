<template>
  <div class="reservoir-overview-map">
    <!-- <highcharts-map></highcharts-map> -->
    <n-map></n-map>
  </div>
</template>

<script>
import HighchartsMap from '@/components/base/HighchartsMap'
import NMap from '@/components/base/NMap'

export default {
  name: 'ReservoirOverviewMap',
  components: {
    HighchartsMap,
    NMap
  }
}
</script>