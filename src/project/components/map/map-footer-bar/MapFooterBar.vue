<template>
  <div v-if="loaded">
    <CoordinateViewer />
  </div>
</template>

<script>
import { } from 'vue'
import useMap from '../../../hooks/webmap/useOlMap'
import CoordinateViewer from './coordinate-viewer/CoordinateViewer.vue'
export default {
  name: 'MapFooterBar',
  components: {
    CoordinateViewer
  },
  setup () {
    const [, loaded] = useMap()
    return {
      loaded
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
