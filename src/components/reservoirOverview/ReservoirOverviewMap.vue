<template>
  <div class="reservoir-overview-map">
    <highcharts-map></highcharts-map>
  </div>
</template>

<script>
import HighchartsMap from '@/components/base/HighchartsMap';

export default {
  name: 'ReservoirOverviewMap',
  components: {
    HighchartsMap
  }
}
</script>