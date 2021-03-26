<template>
  <el-tabs type="border-card">
    <el-tab-pane label="WFS增">
      <el-divider>点</el-divider>
      <el-input
        v-model="stationName"
        placeholder="站点名"
      />
      <el-button @click="drawAddFeature">
        选择站点位置
      </el-button>
      <el-button @click="executeAdd">
        增加
      </el-button>
      <el-button @click="deleteFeature">
        点选删除站点
      </el-button>
      <el-divider>线</el-divider>
      <el-divider>面</el-divider>
    </el-tab-pane>
    <el-tab-pane label="WFS删">
      t
    </el-tab-pane>
    <el-tab-pane label="WFS改">
      <el-divider>点</el-divider>
      <el-divider>线</el-divider>
      <el-divider>面</el-divider>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { defineComponent, onMounted, onUnmounted, reactive, toRaw, toRef, toRefs } from 'vue'
import useMap from '../../../../../../hooks/webmap/useOlMap'
import WfsTransactionInsertTool from './wfs-transaction-insert-tool'
import WfsTransactionDeleteTool from './wfs-transaction-delete-tool'
import WFS from 'ol/format/WFS'
import { createAjax } from '../../../../../../../zhd/dist/ajax-helper/ajax-helper'

export default defineComponent({
  name: 'WfsTransaction',
  setup () {
    const [webMap] = useMap()
    const pointAddState = reactive({
      stationName: '',
      feature: null,
      executeAdd () {
        const feature = toRaw(pointAddState.feature)
        const name = toRaw(pointAddState.stationName)
        feature.setProperties({ name })
        console.log(feature)
        const transactionXml = new WFS().writeTransaction(
          [feature], null, null, {
            featureNS: 'webgis-ol-base',
            featureType: 'stations',
            srsName: 'EPSG:3857',
          }
        )
        let transactStr = (new XMLSerializer()).serializeToString(transactionXml)
        transactStr = transactStr.replace('<geometry>', '<geom>')
        transactStr = transactStr.replace('</geometry>', '</geom>')
        createAjax()
          .setUrl('http://wuxizhe.fun:8080/geoserver/wfs')
          .setHeaders({ 'Content-Type': 'text/xml' })
          .setData(transactStr)
          .mountPost()
          .then(res => res.text())
          .then(res => console.log(res))
          .then(() => {
            const layer = webMap.layerOperation.getLayerByName('广佛地铁站点')
            layer.getSource().refresh()
            layer.setExtent(layer.getSource().getExtent())
          })
        wfsTransactionInsertTool.clearDrawed()
        webMap.mapTools.setMapTool('default')
      },
    })
    const toolName = 'wfsTransactionInsertTool'
    const wfsTransactionInsertTool = new WfsTransactionInsertTool(
      webMap.map,
      webMap.view,
      { drawType: 'point', featureRef: toRef(pointAddState, 'feature') }
    )

    function drawAddFeature () {
      webMap.mapTools.setMapTool('wfsTransactionInsertTool')
    }

    onMounted(() => webMap.mapTools.createCustomTool(toolName, wfsTransactionInsertTool))
    onUnmounted(() => webMap.mapTools.deleteTool(toolName))

    const toolName2 = 'wfsTransactionDeleteTool'
    const wfsTransactionDeleteTool = new WfsTransactionDeleteTool(
      webMap.map,
      webMap.view,
    )

    function deleteFeature () {
      webMap.mapTools.setMapTool('wfsTransactionDeleteTool')
    }

    onMounted(() => webMap.mapTools.createCustomTool(toolName2, wfsTransactionDeleteTool))
    onUnmounted(() => webMap.mapTools.deleteTool(toolName2))

    return {
      ...toRefs(pointAddState),
      drawAddFeature,
      deleteFeature,
    }
  },
})
</script>

<style lang="scss" scoped>

</style>
