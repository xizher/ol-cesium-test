import { computed, toRefs } from 'vue'
import { baseUtils } from '../../zhd/dist/js-utils'

export function useTreeData (list, getLableCallback) { // TODO children
  return computed(() => {
    return list.map(item => ({
      origin: item,
      id: baseUtils.createGuid(),
      label: getLableCallback(item)
    }))
  })
}
