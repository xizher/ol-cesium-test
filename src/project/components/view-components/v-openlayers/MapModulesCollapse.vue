<template>
  <div class="map-modules-collapse">
    <el-collapse>
      <el-collapse-item title="图层控制">
        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
      </el-collapse-item>
      <el-collapse-item title="底图控制">
        <BasemapControl />
      </el-collapse-item>
      <el-collapse-item title="基础工具集">
        <BaseToolBox />
      </el-collapse-item>
      <el-collapse-item title="高级分析工具集">
        <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
        <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
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
export default {
  name: 'MapModulesCollapse',
  components: {
    BasemapControl,
    BaseToolBox,
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
