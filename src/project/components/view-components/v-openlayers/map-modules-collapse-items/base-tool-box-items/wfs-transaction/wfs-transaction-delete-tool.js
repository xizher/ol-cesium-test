import HitTest from '../../../../../../../zhd/dist/gis/openlayers/plugins/map-tools/tools/hit-test/hit-test-tool'
import WFS from 'ol/format/WFS'
import { createAjax } from '../../../../../../../zhd/dist/ajax-helper/ajax-helper'

export class WfsTransactionDeleteTool extends HitTest {

  /** 绘制结束处理事件 */
  onDrawEnd (e) {
    const features = super.onDrawEnd(e)
    if (!features) {
      return false
    }

    const transactionXml = new WFS().writeTransaction(
      null, null, features, {
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
        const layer = this.map.$owner.layerOperation.getLayerByName('广佛地铁站点')
        layer.getSource().refresh()
        layer.setExtent(layer.getSource().getExtent())
      })

  }

}

export default WfsTransactionDeleteTool
