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
  webMapSm.camera.moveEnd.removeEventListener(SynchronizeWebMapSm)
  let olExtentChangeHandler = null
  function SynchronizeWebMapOl () {
    const [lon, lat] = transform(webMapOl.view.getCenter(), webMapOl.view.getProjection(), 'EPSG:4326')
    const zoom = webMapOl.view.getZoom()
    const height = getHeightFromZoom(zoom)
    webMapSm.mapCamera.zoomTo(
      lon, lat, height,
      // () => webMapSm.camera.moveEnd.addEventListener(SynchronizeWebMapSm)
    )
    webMapSm.camera.moveEnd.addEventListener(SynchronizeWebMapSm)
  }
  function SynchronizeWebMapSm () {
    unByKey(olExtentChangeHandler)
    const [lon, lat] = webMapSm.mapCamera.getCameraLonLat()
    const height = webMapSm.mapCamera.getCameraHeight()
    const center = transform([lon, lat], 'EPSG:4326', webMapOl.view.getProjection())
    const zoom = getZoomFromHeight(height)
    webMapOl.view.animate({
      center,
      zoom,
      duration: 0,
    })
    olExtentChangeHandler = webMapOl.view.on('change', SynchronizeWebMapOl)
  }
  olExtentChangeHandler = webMapOl.view.on('change', SynchronizeWebMapOl)
  webMapSm.camera.moveEnd.addEventListener(SynchronizeWebMapSm)
}

function getHeightFromZoom (zoom) {

  const cosin = ((Math.cos(Math.PI / 180 * (85.362 / 2))) / (Math.sin(Math.PI / 180 * (85.362 / 2))))
  const firstPartOfEq = (.05 * ((591657550.5 / (Math.pow(2, (zoom - 2.5)))) / 2))
  const height = (firstPartOfEq) * cosin

  return height
}

function getZoomFromHeight (height) {

  const cosin = ((Math.cos(Math.PI / 180 * (85.362 / 2))) / (Math.sin(Math.PI / 180 * (85.362 / 2))))
  const zoom = Math.log2((cosin * 591657550.5) / (40 * height)) + 2.5
  return zoom

}
