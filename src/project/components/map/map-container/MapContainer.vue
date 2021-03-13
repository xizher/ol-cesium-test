<template>
  <div class="map-container">
    <div :id="mapId" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useCreateWebMap } from '../../../hooks/webmap/useOlMap'
import { baseUtils } from '../../../../zhd/dist/js-utils'

export default defineComponent({
  name: 'MapContainer',
  setup () {
    const mapId = baseUtils.createGuid()
    useCreateWebMap(mapId)

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
