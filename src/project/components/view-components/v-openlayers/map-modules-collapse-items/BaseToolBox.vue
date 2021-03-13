<template>
  <el-tabs type="border-card">
    <el-tab-pane label="地图标注">
      <MapMarkTool />
    </el-tab-pane>
    <el-tab-pane label="地图测量">
      <MapMeasureTool />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { } from 'vue'
import MapMarkTool from './base-tool-box-items/MapMarkTool.vue'
import MapMeasureTool from './base-tool-box-items/MapMeasureTool.vue'
export default {
  name: 'BaseToolBox',
  components: {
    MapMarkTool,
    MapMeasureTool,
  },
  setup () {

    return {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
