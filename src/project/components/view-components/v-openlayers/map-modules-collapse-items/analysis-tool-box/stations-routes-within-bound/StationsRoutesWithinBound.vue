<template>
  <el-button
    size="mini"
    @click="visible = true"
  >
    {{ title }}
  </el-button>
  <ToolboxContainer
    left="200px"
    top="200px"
    :title="title"
    :visible="visible"
    @cancel="cancel"
  >
    <el-form
      label-width="60px"
      label-position="left"
      size="mini"
    >
      <el-form-item label="行政区">
        <el-select
          v-model="selectedBoundary"
          placeholder="请选择"
        >
          <el-option
            v-for="item in propertieList"
            :key="item.name"
            :label="item.name"
            :value="item.name"
          />
        </el-select>
        <el-divider direction="vertical" />
        <el-button @click="selectBound">
          点击地图选择
        </el-button>
      </el-form-item>
      <el-form-item label="统计项">
        <el-radio-group v-model="selectedStatType">
          <el-radio label="stations">
            站点
          </el-radio>
          <el-radio label="subway">
            线路
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button @click="execute">
          执行分析
        </el-button>
        <el-button @click="clear">
          清理结果
        </el-button>
        <el-button @click="reset">
          重置工具
        </el-button>
      </el-form-item>
    </el-form>
  </ToolboxContainer>
</template>

<script>
import { defineComponent, reactive, ref, toRaw, watch } from 'vue'
import useMap from '../../../../../../hooks/webmap/useOlMap'
import ToolboxContainer from '../../../../../base/ToolboxContainer.vue'
import { IntersectsTool } from '../../../../../../../zhd/dist/gis/openlayers/toolbox/spatial-analysis/intersects.tool'
import HitTestFromBoundTool from './hit-test-from-bound-tool'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name: 'StationsRoutesWithinBound',
  components:{
    ToolboxContainer
  },
  setup () {
    const visible = ref(false)
    const title = '统计指定行政区范围内的站点或线路'

    const [webMap] = useMap()
    const { layerOperation } = webMap
    const layer = layerOperation.getLayerByName('广州区县级行政区划')
    const propertieList = reactive([])
    let features = layer.getSource().getFeatures()
    if (features.length === 0) {
      layerOperation.setLayerVisible('广州区县级行政区划', true)
      const handler = layer.on('prerender', () => {
        features = layer.getSource().getFeatures()
        initFeatureList(features)
        layerOperation.setLayerVisible('广州区县级行政区划', false)
        layer.un('prerender', handler.listener)
      })
    } else {
      initFeatureList(features)
    }

    function initFeatureList (features) {
      features.forEach(feat => {
        propertieList.push(feat.getProperties())
      })
    }

    const intersectsTool = new IntersectsTool(webMap)
    let highlightFeatures = []
    intersectsTool.on('tool-done', () => {
      const geometries = intersectsTool.getResult().map(feat => feat.getGeometry())
      highlightFeatures = webMap.mapElementDisplay.parseHighlightGraphics(geometries)
      webMap.mapElementDisplay.setHighlight(highlightFeatures)
    })
    intersectsTool.on('tool-error', e => {
      ElMessage.warning(e.message)
    })
    const selectedBoundary = ref('')
    watch(selectedBoundary, val => {
      if (val) {
        const { geometry } = propertieList.find(item => item.name === val)
        intersectsTool.setIntersectsGeometry(toRaw(geometry))
      }
    })
    const selectedStatType = ref('')
    watch(selectedStatType, val => {
      if (val === 'stations') {
        const layer = layerOperation.getLayerByName('广佛地铁站点')
        const features = layer.getSource().getFeatures()
        intersectsTool.setTarget(features)
      } else if (val === 'subway') {
        const layer = layerOperation.getLayerByName('广佛地铁线路')
        const features = layer.getSource().getFeatures()
        intersectsTool.setTarget(features)
      }
    })

    function execute () {
      intersectsTool.execute()
    }

    function clear () {
      webMap.mapElementDisplay.removeHighlight(highlightFeatures)
      highlightFeatures = []
      intersectsTool.clearResult()
    }

    function reset () {
      webMap.mapElementDisplay.removeHighlight(highlightFeatures)
      highlightFeatures = []
      selectedBoundary.value = ''
      selectedStatType.value = ''
      intersectsTool.resetTool()
    }

    function cancel () {
      clear()
      visible.value = false
    }

    const hitTestTool = new HitTestFromBoundTool(webMap.map, webMap.view, {
      selectedBoundary,
      layer
    })
    const toolName = 'hit-test-from-bound-tool'
    watch(visible, v => {
      if (v) {
        webMap.mapTools.createCustomTool(toolName, hitTestTool)
      } else {
        webMap.mapTools.setMapTool('default')
        webMap.mapTools.deleteTool(toolName)
      }
    }, { immediate: true })
    function selectBound () {
      webMap.mapTools.setMapTool(toolName)
    }

    return {
      visible,
      title,
      propertieList,
      selectedBoundary,
      selectedStatType,
      execute,
      clear,
      cancel,
      selectBound,
      reset,
    }
  },
})
</script>

<style lang="scss" scoped>

</style>
