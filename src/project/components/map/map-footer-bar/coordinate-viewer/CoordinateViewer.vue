<template>
  <div>
    {{ lonlatFormat }}
  </div>
</template>

<script>
import { } from 'vue'
import { useMouseCoordinate } from '../../../../../zhd/dist/gis/openlayers/hooks/web-map.hooks'
import useMap from '../../../../hooks/webmap/useOlMap'
export default {
  name: 'CoordinateViewer',
  setup () {
    const [webMap] = useMap()
    const {
      lonlatFormat
    } = useMouseCoordinate(webMap)
    return {
      lonlatFormat
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
