import { onMounted } from 'vue'
import {
  Basemap as OpenlayersBasemap,
  WebMap as OpenlayersWebMap,
} from '../../zhd/dist/gis/openlayers'
import {
  initModules,
  WebMap as SupermapWebMap,
  Basemap as SupermapBasemap,
  MapCamera as SupermapMapCamera,
} from '../../zhd/dist/gis/supermap'
import appConfig from '../config/app.config'
import { transform } from 'ol/proj'
import { unByKey } from 'ol/Observable'


export default function (openlayersId, supermapId) {
  let webMapOl = null
  let webMapSm = null
  const supermapConfig = appConfig.webMapConfig.supermap
  onMounted(() => {
    webMapOl = new OpenlayersWebMap(openlayersId)
      .use(new OpenlayersBasemap({ key: '天地图矢量' }))
      .mount()

    initModules(supermapConfig.cssUrl, supermapConfig.jsUrl).then(() => {
      webMapSm = new SupermapWebMap(supermapId)
        .use(new SupermapBasemap({ key: '天地图矢量' }))
        .use(new SupermapMapCamera())

      window.webMapOl = webMapOl
      window.webMapSm = webMapSm
      linkMap(webMapOl, webMapSm)
    })
  })
}

/**
 *
 * @param { OpenlayersWebMap } webMapOl
 * @param { SupermapWebMap } webMapSm
 */
function linkMap (webMapOl, webMapSm) {
  function SynchronizeWebMapOl () {
    const [lon, lat] = transform(webMapOl.view.getCenter(), webMapOl.view.getProjection(), 'EPSG:4326')
    const zoom = webMapOl.view.getZoom()
    const height = getHeightFromZoom(zoom)
    webMapSm.mapCamera.zoomTo(
      lon, lat, height,
      // () => webMapSm.camera.moveEnd.addEventListener(SynchronizeWebMapSm)
    )
  }
  function SynchronizeWebMapSm () {
    const [lon, lat] = webMapSm.mapCamera.getCameraLonLat()
    const height = webMapSm.mapCamera.getCameraHeight()
    const center = transform([lon, lat], 'EPSG:4326', webMapOl.view.getProjection())
    const zoom = getZoomFromHeight(height)
    webMapOl.view.animate({
      center,
      zoom,
      duration: 300,
    })
  }
  // webMapOl.view.on('change', SynchronizeWebMapOl)
  webMapSm.camera.moveEnd.addEventListener(SynchronizeWebMapSm)
}

const LINKTABLE = {
  20 : 112.497220,
  19 : 225.994440,
  18 : 451.988880,
  17 : 902.977761,
  16 : 1805.955520,
  15 : 3611.911040,
  14 : 7222.822090,
  13 : 14444.644200,
  12 : 28889.288400,
  11 : 57779.576700,
  10 : 115558.153000,
  9  : 231116.307000,
  8  : 462232.614000,
  7  : 924464.227000,
  6  : 1848929.450000,
  5  : 3697859.910000,
  4  : 7395719.820000,
  3  : 14791438.600000,
  2  : 29582877.300000,
  1  : 59165755.500000,
}

function getHeightFromZoom (zoom) {

  const cosin = ((Math.cos(Math.PI / 180 * (85.362 / 2))) / (Math.sin(Math.PI / 180 * (85.362 / 2))))
  const firstPartOfEq = (.05 * ((591657550.5 / (Math.pow(2, (zoom - 2.5)))) / 2))
  const height = (firstPartOfEq) * cosin

  return height
}

function getZoomFromHeight (height) {

  const cosin = ((Math.cos(Math.PI / 180 * (85.362 / 2))) / (Math.sin(Math.PI / 180 * (85.362 / 2))))
  const zoom = Math.log2(1 / (height / cosin * 40 / 591657550.5)) - 2.5
  return zoom

}
