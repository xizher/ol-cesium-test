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
      <el-button @click="clearMark">
        清空标注
      </el-button>
      <el-button
        :type="removeToolActived ? 'primary' : 'default'"
        @click="removeToolActived = true"
      >
        移除指定标注
      </el-button>
    </el-button-group>
  </div>
</template>

<script>
import { } from 'vue'
import useMap from '../../../../../hooks/webmap/useOlMap'
import useMark, { useEnabled, useClearMark, useMarkRemoveTool } from '../../../../../../zhd/dist/gis/openlayers/hooks/mark-tool.hooks'
export default {
  name: 'MapMarkTool',
  setup () {
    const [webMap] = useMap()
    const [selectedType, typeList] = useMark(webMap.mapTools)
    const clearMark = useClearMark(webMap.mapTools)
    const enabled = useEnabled(webMap.mapTools)
    const removeToolActived = useMarkRemoveTool(webMap.mapTools)
    return {
      selectedType, typeList,
      clearMark,
      enabled,
      removeToolActived
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
