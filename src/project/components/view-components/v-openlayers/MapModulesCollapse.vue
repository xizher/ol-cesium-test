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
        <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
        <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
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
