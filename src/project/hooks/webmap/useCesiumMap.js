import { onMounted, ref } from 'vue'
import {
  Basemap,
  WebMap,
  MapEntities,
  Map3dTile
} from '../../../zhd/dist/gis/cesium'
import appConfig from '../../config/app.config'
import { baseUtils } from '../../../zhd/dist/js-utils'
baseUtils.loadCss(appConfig.webMapConfig.cesium.cssUrl)
// baseUtils.loadJs(appConfig.webMapConfig.cesium.jsUrl)

/** @type { WebMap } */
let webMap = null
const loaded = ref(false)

/** @returns { [WebMap, import('vue').Ref<boolean>] } */
function useMap () {
  return [webMap, loaded]
}
export default useMap

export function useCreateWebMap (mapId) {
  const cesiumConfig = appConfig.webMapConfig.cesium
  window.CESIUM_BASE_URL = cesiumConfig.baseUrl
  onMounted(() => {
    webMap = new WebMap(mapId, cesiumConfig.webMapOptions)
      .use(new Basemap(cesiumConfig.basemapOptions))
      .use(new MapEntities())
      .use(new Map3dTile(cesiumConfig.map3dTileOptions))
    loaded.value = true
    window.webMap = webMap // 开发模式下使用
  })

}
