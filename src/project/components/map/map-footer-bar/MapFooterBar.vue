<template>
  <div v-if="loaded">
    <CoordinateViewer v-if="route.path === '/'" />
  </div>
</template>

<script>
import { } from 'vue'
import useMap from '../../../hooks/webmap/useOlMap'
import CoordinateViewer from './coordinate-viewer/CoordinateViewer.vue'
import { useRoute } from 'vue-router'
export default {
  name: 'MapFooterBar',
  components: {
    CoordinateViewer
  },
  setup () {
    const [, loaded] = useMap()
    const route = useRoute()
    return {
      loaded, route
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
