import { HitTestTool } from '../../../../../../../zhd/dist/gis/openlayers/plugins/map-tools/tools/hit-test/hit-test-tool'

class HitTestFromBoundTool extends HitTestTool {

  constructor (map, view, {
    layer, selectedBoundary
  }) {
    super(map, view)
    this.setTargetLayers(layer)
    this.selectedBoundary = selectedBoundary
  }

  onDrawEnd (e) {
    const features = super.onDrawEnd(e)
    if (!features) {
      return false
    }
    const [feature] = features
    if (!feature) {
      return
    }
    const { name } = feature.getProperties()
    this.selectedBoundary.value = name
    this.map.$owner.mapTools.setMapTool('default')
  }

}

export default HitTestFromBoundTool
