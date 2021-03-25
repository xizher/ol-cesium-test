<template>
  <div>
    <el-button-group>
      <el-button
        v-for="item in typeList"
        :key="item.name"
        :type="(item.name === selectedType && enabled) ? 'primary' : 'default'"
        @click="selectedType = item.name"
      >
        {{ item.alias }}
      </el-button>
      <el-button @click="clearMeasure">
        清空信息
      </el-button>
      <el-button
        :type="removeToolActived ? 'primary' : 'default'"
        @click="removeToolActived = true"
      >
        移除指定测量信息
      </el-button>
    </el-button-group>
  </div>
</template>

<script>
import { } from 'vue'
import useMap from '../../../../../hooks/webmap/useOlMap'
import useMeasureTool from '../../../../../../zhd/dist/gis/openlayers/hooks/measure-tool.hooks'
export default {
  name: 'MapMeasureTool',
  setup () {
    const [webMap] = useMap()
    const [selectedType, typeList, enabled, clearMeasure, removeToolActived] = useMeasureTool(webMap.mapTools)
    return {
      selectedType, typeList,
      clearMeasure,
      enabled,
      removeToolActived
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
