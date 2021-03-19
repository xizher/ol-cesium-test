<template>
  <div class="map-modules-collapse">
    <el-collapse>
      <el-collapse-item title="底图控制">
        <BasemapControl />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import BasemapControl from './map-modules-collapse-items/BasemapControl.vue'

export default defineComponent({
  name: 'MapModulesCollapse',
  components: {
    BasemapControl,
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
