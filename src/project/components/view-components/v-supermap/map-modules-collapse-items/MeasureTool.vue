<template>
  <el-form label-width="40px">
    <el-form-item label="方式">
      <el-radio-group v-model="type">
        <el-radio label="distance">
          距离
        </el-radio>
        <el-radio label="area">
          面积
        </el-radio>
        <el-radio label="height">
          高程
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="模式">
      <el-radio-group v-model="mode">
        <el-radio :label="0">
          空间测量
        </el-radio>
        <el-radio :label="1">
          贴地测量
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-button
      :type="actived ? 'primary' : 'default'"
      @click="actived = !actived"
    >
      测量状态（{{ actived ? '开' : '关' }}）
    </el-button>
    <el-button @click="clear">
      清理测量结果
    </el-button>
  </el-form>
</template>

<script>
import { defineComponent, watch } from 'vue'
import useMeasureTool from '../../../../../zhd/dist/gis/supermap/hooks/measure-tool.hooks'
import useMap from '../../../../hooks/webmap/useSupermapMap'

export default defineComponent({
  name: 'MeasureTool',
  setup () {
    const [webMap] = useMap()
    const [type, mode, actived, clear] = useMeasureTool(webMap.mapTools)
    watch([type, mode], () => actived.value = true)
    return {
      type,
      mode,
      actived,
      clear,
    }
  },
})
</script>

<style lang="scss" scoped>

</style>
