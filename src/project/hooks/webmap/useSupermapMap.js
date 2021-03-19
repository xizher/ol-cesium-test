import { onMounted, ref } from 'vue'
import {
  initModules,
  WebMap,
  Basemap,
  MapEntities
} from '../../../zhd/dist/gis/supermap'
import appConfig from '../../config/app.config'


/** @type { WebMap } */
let webMap = null
const loaded = ref(false)


/** @returns { [WebMap, import('vue').Ref<boolean>] } */
function useMap () {
  return [webMap, loaded]
}
export default useMap

export function useCreateWebMap (mapId) {
  const supermapConfig = appConfig.webMapConfig.supermap
  onMounted(() => {
    initModules(supermapConfig.cssUrl, supermapConfig.jsUrl).then(() => {

      webMap = new WebMap(mapId, supermapConfig.webMapOptions)
        .use(new Basemap(supermapConfig.basemapOptions))
        .use(new MapEntities())
      loaded.value = true
      window.webMap = webMap // 开发模式下使用
    })
  })
}
