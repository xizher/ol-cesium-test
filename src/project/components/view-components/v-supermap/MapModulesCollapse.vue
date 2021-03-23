<template>
  <div class="map-modules-collapse">
    <el-collapse>
      <el-collapse-item title="底图控制">
        <BasemapControl />
      </el-collapse-item>
      <el-collapse-item title="实体控制">
        实体s
      </el-collapse-item>
      <el-collapse-item title="3dTile控制">
        <Map3dTileControl />
      </el-collapse-item>
      <el-collapse-item title="GeoJSON控制">
        GeoJSONs
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import BasemapControl from './map-modules-collapse-items/BasemapControl.vue'
import Map3dTileControl from './map-modules-collapse-items/Map3dTileControl.vue'

export default defineComponent({
  name: 'MapModulesCollapse',
  components: {
    BasemapControl,
    Map3dTileControl,
  },
  setup () {

    return {
    }
  },
})
</script>

<style lang="scss" scoped>
.map-modules-collapse {
  padding: 0 4px;
}
:deep(.el-collapse-item__header) {
  // height: 30px;
  font-weight: bold;
}
</style>
