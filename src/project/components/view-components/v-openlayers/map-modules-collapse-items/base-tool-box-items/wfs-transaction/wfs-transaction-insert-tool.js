import { DrawTool } from '../../../../../../../zhd/dist/gis/openlayers/plugins/map-tools/tools/draw/draw-tool'

class WfsTransactionInsertTool extends DrawTool {

  constructor (map, view, {
    drawType, featureRef
  }) {
    super(map, view, { drawType, isDrawOnlyOneTarget: true })
    this.featureRef = featureRef
  }

  onDrawEnd (e) {
    const features = super.onDrawEnd(e)
    if (!features) {
      return false
    }
    this.featureRef.value = features[0]
  }

}

export default WfsTransactionInsertTool
