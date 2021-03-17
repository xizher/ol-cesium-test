<template>
  <div class="map-modules-collapse">
    <el-collapse>
      <el-collapse-item title="图层控制">
        <LayerControl />
      </el-collapse-item>
      <el-collapse-item title="底图控制">
        <BasemapControl />
      </el-collapse-item>
      <el-collapse-item title="基础工具集">
        <BaseToolBox />
      </el-collapse-item>
      <el-collapse-item title="高级分析工具集">
        <AnalysisToolBox />
      </el-collapse-item>
      <el-collapse-item title="其他">
        <div>...</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { } from 'vue'
import BasemapControl from './map-modules-collapse-items/BasemapControl.vue'
import BaseToolBox from './map-modules-collapse-items/BaseToolBox.vue'
import LayerControl from './map-modules-collapse-items/LayerControl.vue'
import AnalysisToolBox from './map-modules-collapse-items/AnalysisToolBox.vue'
export default {
  name: 'MapModulesCollapse',
  components: {
    BasemapControl,
    BaseToolBox,
    LayerControl,
    AnalysisToolBox,
  },
  setup () {

    return {

    }
  }
}
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
