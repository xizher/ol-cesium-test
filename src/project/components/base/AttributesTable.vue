<template>
  <ToolboxContainer
    left="200px"
    right="200px"
    :title="`属性表：${layerName}`"
    :visible="visible"
    @cancel="cancel"
  >
    <el-table
      :data="attributesData"
      style="width: 100%; height: 100%"
    >
      <el-table-column
        v-for="field in fields"
        :key="field"
        :fixed="field === '$index' ? true : false"
        :prop="field"
        :label="field"
      />
    </el-table>
  </ToolboxContainer>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useLayerAttributes } from '../../../zhd/dist/gis/openlayers/hooks/layer-operation.hooks'
import useMap from '../../hooks/webmap/useOlMap'
import ToolboxContainer from './ToolboxContainer.vue'

export default defineComponent({
  name: 'AttributesTable',
  components: {
    ToolboxContainer
  },
  props: {
    layerName: { type: String, default: '' },
    visible: { type: Boolean, default: false },
  },
  emits: [
    'cancel'
  ],
  setup (props, { emit }) {
    const [webMap] = useMap()
    const attributesData = computed(() => {
      const data = useLayerAttributes(webMap.layerOperation, props.layerName)
      if (data) {
        return data
      }
      return []
    })
    const fields = computed(() => {
      if (attributesData.value.length === 0) {
        return []
      }
      return Object.keys(attributesData.value[0])
    })

    function cancel () {
      emit('cancel')
    }

    return {
      attributesData, fields, cancel
    }
  },
})
</script>

<style lang="scss" scoped>

</style>
