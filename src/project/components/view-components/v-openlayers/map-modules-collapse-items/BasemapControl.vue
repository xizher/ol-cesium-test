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
import { } from 'vue'
import useMap from '../../../../hooks/webmap/useOlMap'
import { useList, useKey, useVisible } from '../../../../../zhd/dist/gis/openlayers/hooks/basemap.hooks'
export default {
  name: 'BasemapControl',
  setup () {

    const [webMap] = useMap()
    const [list] = useList(webMap.basemap)
    const selectedKey = useKey(webMap.basemap)
    const visible = useVisible(webMap.basemap)

    return {
      list, selectedKey, visible
    }
  }
}
</script>

<style lang="scss" scoped>
.basemap-control-form {
  :deep(.el-form-item) {
    margin-bottom: 0;
  }
}
</style>
