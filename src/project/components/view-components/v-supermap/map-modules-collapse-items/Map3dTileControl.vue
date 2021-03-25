<template>
  <el-card
    v-for="item in tilesetList"
    :key="item.name"
    class="map-3d-tile-control"
  >
    <div class="name">
      {{ item.name }}
    </div>
    <el-switch v-model="item.visible" />
    <el-button
      size="mini"
      @click="item.zoomTo"
    >
      定位到
    </el-button>
  </el-card>
</template>

<script>
import { defineComponent } from 'vue'
import useMap from '../../../../hooks/webmap/useSupermapMap'
import useMap3dTile from '../../../../../zhd/dist/gis/supermap/hooks/map-3d-tile.hook'

export default defineComponent({
  name: 'Map3dTileControl',
  setup () {
    const [webMap] = useMap()
    const [tilesetList] = useMap3dTile(webMap.map3dTile)

    return {
      tilesetList
    }
  },
})
</script>

<style lang="scss" scoped>
.map-3d-tile-control {
  display: flex;
  :deep(.el-card) {
    width: 100%;
  }
}
</style>
