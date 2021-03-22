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
import WFS from 'ol/format/WFS'
import axiosHelper from '../../../../../../../zhd/dist/axios-helper/axios-helper'

export default defineComponent({
  name: 'WfsTransaction',
  setup () {
    const [webMap] = useMap()
    const pointAddState = reactive({
      stationName: '',
      feature: null,
      executeAdd () {
        /** @type { import('ol/layer/Vector').default */
        // const layer = webMap.layerOperation.getLayerByName('广佛地铁站点')
        // const url = layer.getSource().getUrl()
        // console.log(url)
        // http://wuxizhe.fun:8080/geoserver/webgis-ol-base/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=webgis-ol-base:stations&outputFormat=application/json
        const feature = toRaw(pointAddState.feature)
        const name = toRaw(pointAddState.stationName)
        feature.setProperties({ name })
        const transactionXml = new WFS().writeTransaction(
          [feature], null, null, {
            featureNS: 'http://wuxizhe.fun:8080/geoserver/webgis-ol-base',
            featurePrefix: 'webgis-ol-base',
            featureType: 'stations',
            srsName: 'EPSG:3857'
          }
        )
        const transactStr = (new XMLSerializer()).serializeToString(transactionXml)
        axiosHelper()
          .setUrl('http://wuxizhe.fun:8080/geoserver/wfs')
          .setConfig({ headers: { 'Content-Type': 'text/xml' } })
          .setData(transactStr)
          .mountPost()
          .then(res => {
            console.log(res)
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

    return {
      ...toRefs(pointAddState),
      drawAddFeature,
    }
  },
})
</script>

<style lang="scss" scoped>

</style>
