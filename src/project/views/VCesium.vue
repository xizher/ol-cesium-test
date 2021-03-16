<template>
  <div class="route-view-component">
    <div id="cesium-container" />
  </div>
</template>

<script>
window.CESIUM_BASE_URL = 'https://cesium.com/downloads/cesiumjs/releases/1.79.1/Build/Cesium/'
// import * as Cesium from 'cesium';
import { onMounted } from 'vue'
import { WebMap } from '../../zhd/dist/gis/cesium'
export default {
  name: 'VCesium',
  setup () {
    onMounted(() => {
      const webMap = new WebMap('cesium-container')
      window.webMap = webMap
    })
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
#cesium-container {
  height: 100%;
}
</style>
