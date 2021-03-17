<template>
  <div>
    <el-form class="basemap-control-form">
      <el-form-item label="可见性">
        <el-radio-group v-model="visible">
          <el-radio :label="true">
            可见
          </el-radio>
          <el-radio :label="false">
            不可见
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="底图项">
        <el-select v-model="selectedKey">
          <el-option
            v-for="item in list"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import useMap from '../../../../hooks/webmap/useCesiumMap'
import useBasemap from '../../../../../zhd/dist/gis/cesium/hooks/basemap.hooks'

export default defineComponent({
  name: 'BasemapControl',
  setup () {
    const [webMap] = useMap()
    const [selectedKey, visible, list] = useBasemap(webMap.basemap)

    return {
      selectedKey, visible, list
    }
  },
})
</script>

<style lang="scss" scoped>
.basemap-control-form {
  :deep(.el-form-item) {
    margin-bottom: 0;
  }
}
</style>
