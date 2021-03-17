import { onMounted, ref } from '@vue/runtime-core'
import {
  Basemap,
  MapCursor,
  MapElementDisplay,
  MapTools,
  WebMap,
  LayerOperation,
} from '../../../zhd/dist/gis/openlayers'
import appConfig from '../../config/app.config'

/** @type { WebMap } */
let webMap = null
const loaded = ref(false)
/** @returns { [WebMap, import('@vue/reactivity').Ref<boolean>] } */
function useMap () {
  return [webMap, loaded]
}
export default useMap

export function useCreateWebMap (mapId) {
  const { webMapConfig: config } = appConfig
  webMap = new WebMap(mapId, config.ol.webMapOptions)
    .use(new Basemap(config.ol.basemapOptions))
    .use(new MapElementDisplay())
    .use(new MapCursor())
    .use(new MapTools())
    .use(new LayerOperation(config.ol.layerOperationOptions))
  webMap.on('loaded', () => loaded.value = true)
  onMounted(() => webMap.mount())

  window.webMap = webMap // 开发模式下使用
}
