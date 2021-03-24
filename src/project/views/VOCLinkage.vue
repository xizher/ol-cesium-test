<template>
  <div class="route-view-component">
    <div class="map-container">
      <div id="map-openlayers" />
      <div id="map-supermap" />
    </div>
  </div>
</template>

<script>
import { } from 'vue'
import useOCLinkage from '../hooks/useOCLinkage'
export default {
  name: 'VOCLinkage',
  setup () {
    useOCLinkage('map-openlayers', 'map-supermap')
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.map-container {
  display: flex;
  height: 100%;
  width: 100%;
  > * {
    flex: 1;
  }
}
</style>
