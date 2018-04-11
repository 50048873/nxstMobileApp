<template>
  <div class="reservoir-overview-map">
    <!-- <highcharts-map></highcharts-map> -->
    <n-map></n-map>
    <!-- <arc-gis></arc-gis> -->
  </div>
</template>

<script>
import HighchartsMap from '@/components/reservoirOverview/ReservoirOverviewMap/HighchartsMap'
import NMap from '@/components/reservoirOverview/ReservoirOverviewMap/NMap'
import ArcGis from '@/components/reservoirOverview/ReservoirOverviewMap/ArcGis'

export default {
  name: 'ReservoirOverviewMap',
  components: {
    HighchartsMap,
    NMap,
    ArcGis
  }
}
</script>