<template>
  <ToolboxContainer
    left="100px"
    top="100px"
    class="attributes-table-container"
    :title="`属性表：${layerName}`"
    :visible="visible"
    @cancel="cancel"
  >
    <el-table
      :data="attributesData"
      height="60vh"
      style="width: 60vw"
      size="mini"
      @row-dblclick="zoomTo"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        v-for="field in fields"
        :key="field"
        :fixed="field === '$index' ? true : false"
        :prop="field"
        :label="field"
        :min-width="field === '$index' ? 65 : 100"
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

    function zoomTo (e) {
      /** @type { import('ol/layer/Vector').default } */
      const layer = webMap.layerOperation.getLayerByName(props.layerName)
      const feature = layer.getSource().getFeatureById(e.$id)
      const geometry = feature.getGeometry()
      webMap.view.fit(geometry, {
        duration: 500,
        maxZoom: 16,
      })
    }

    return {
      attributesData,
      fields,
      cancel,
      zoomTo,
    }
  },
})
</script>

<style lang="scss" scoped>
.attributes-table-container {
  min-width: 60vw;
}
</style>
