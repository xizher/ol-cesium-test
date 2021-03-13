<template>
  <div class="route-view-component">
    <MapContainer />
  </div>
  <MapToolBar />
  <el-aside
    class="aside-component"
    :width="widthStr"
  >
    <MapModulesCollapse />
    <AsideSlider
      v-if="showSlider"
      :aside-width="width"
      @updateWidth="w => width = w"
    />
  </el-aside>
</template>

<script>
import { computed, ref } from 'vue'
import MapContainer from '../components/map/map-container/MapContainer.vue'
import AsideSlider from '../components/app/app-main/aside-slider/AsideSlider.vue'
import MapModulesCollapse from '../components/view-components/v-openlayers/MapModulesCollapse.vue'
import MapToolBar from '../components/view-components/v-openlayers/MapToolBar.vue'
import appConfig from '../config/app.config'
export default {
  name: 'VOpenlayers',
  components: {
    MapContainer,
    AsideSlider,
    MapModulesCollapse,
    MapToolBar,
  },
  setup () {
    const { showSlider, defaultWidth } = appConfig.viewOpenlayersConfig.asideConfig
    const width = ref(defaultWidth)
    const widthStr = computed(() => `${width.value}px`)


    return {
      widthStr, showSlider, width
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
