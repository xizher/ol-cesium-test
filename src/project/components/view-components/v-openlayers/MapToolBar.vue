<template>
  <div class="map-tool-bar">
    <el-button
      v-for="item in btns"
      :key="item"
      size="mini"
      :type="item.toolKey === activedKey ? 'info' : 'default'"
      :icon="item.icon"
      @click="() => activedKey = item.toolKey"
    />
  </div>
</template>

<script>
import { } from 'vue'
import useMap from '../../../hooks/webmap/useOlMap'
import useMapTools from '../../../../zhd/dist/gis/openlayers/hooks/map-tools.hooks'
export default {
  name: 'MapToolBar',
  setup () {
    const btns = [
      { toolKey: 'default', icon: 'el-icon-mouse' },
      { toolKey: 'zoom-in', icon: 'el-icon-plus' },
      { toolKey: 'zoom-out', icon: 'el-icon-minus' },
      { toolKey: 'zoom-in-rect', icon: 'el-icon-zoom-in' },
      { toolKey: 'zoom-out-rect', icon: 'el-icon-zoom-out' },
      { toolKey: 'zoom-home', icon: 'el-icon-s-home' },
      { toolKey: 'fullscreen', icon: 'el-icon-full-screen' },
      { toolKey: 'fullmap', icon: 'el-icon-bangzhu' },
    ]

    const [webMap] = useMap()
    const [activedKey] = useMapTools(webMap.mapTools)

    return {
      activedKey, btns
    }
  }
}
</script>

<style lang="scss" scoped>
.map-tool-bar {
  position: absolute;
  top: 8px;
  left: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  :deep(.el-button) {
    padding: 8px;
  }
  :deep(.el-button+.el-button) {
    margin-left: 0;
  }
}
</style>
