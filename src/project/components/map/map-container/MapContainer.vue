<template>
  <div class="map-container">
    <div :id="mapId" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useCreateWebMap as useCreateOlWebMap } from '../../../hooks/webmap/useOlMap'
import { useCreateWebMap as useCreateCesiumWebMap } from '../../../hooks/webmap/useCesiumMap'
import { baseUtils } from '../../../../zhd/dist/js-utils'

export default defineComponent({
  name: 'MapContainer',
  props: {
    type: { type: String, default: 'ol' }
  },
  setup (props) {
    const mapId = baseUtils.createGuid()
    if (props.type === 'ol') {
      useCreateOlWebMap(mapId)
    } else if (props.type === 'cesium') {
      useCreateCesiumWebMap(mapId)
    }

    return {
      mapId
    }
  },
})
</script>

<style lang="scss" scoped>
.map-container {
  height: 100%;
  width: 100%;
  display: flex;
  > * {
    flex: 1;
  }
}
</style>
