import { onMounted, ref } from '@vue/runtime-core'
import {
  Basemap,
  MapCursor,
  MapElementDisplay,
  MapTools,
  WebMap
} from '../../../zhd/dist/gis/openlayers'
import appConfig from '../../config/app.config'
import { useLinkIn } from '../../../zhd/dist/vue-hooks/loading.hooks'
import { LayerOperation } from '../../../zhd/dist/gis/openlayers/plugins/layer-operation/layer-operation'

/** @type { WebMap } */
let webMap = null
const loaded = ref(false)
useLinkIn(loaded)
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
