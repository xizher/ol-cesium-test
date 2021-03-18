<template>
  <div class="map-container">
    <div :id="mapId" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { baseUtils } from '../../../../zhd/dist/js-utils'

export default defineComponent({
  name: 'MapContainer',
  props: {
    useCreateMap: { type: Function, default: () => () => null }
  },
  setup (props) {
    const mapId = baseUtils.createGuid()
    props.useCreateMap(mapId)

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
