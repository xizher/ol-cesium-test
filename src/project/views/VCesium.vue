<template>
  <div class="route-view-component">
    <MapContainer type="cesium" />
  </div>
  <el-aside
    class="aside-component"
    :width="widthStr"
  >
    <MapModulesCollapse v-if="loaded" />
    <AsideSlider
      v-if="showSlider"
      :aside-width="width"
      @updateWidth="w => width = w"
    />
  </el-aside>
</template>

<script>
import MapContainer from '../components/map/map-container/MapContainer.vue'
import AsideSlider from '../components/app/app-main/aside-slider/AsideSlider.vue'
import MapModulesCollapse from '../components/view-components/v-cesium/MapModulesCollapse.vue'
import appConfig from '../config/app.config'
import { ref, computed } from 'vue'
import useMap from '../hooks/webmap/useCesiumMap'
export default {
  name: 'VCesium',
  components: {
    MapContainer,
    AsideSlider,
    MapModulesCollapse,
  },
  setup () {
    const { showSlider, defaultWidth } = appConfig.viewCesiumConfig.asideConfig
    const width = ref(defaultWidth)
    const widthStr = computed(() => `${width.value}px`)
    const [, loaded] = useMap()


    return {
      widthStr, showSlider, width, loaded
    }
  }
}
</script>

<style lang="scss" scoped>
#cesium-container {
  height: 100%;
}
</style>
