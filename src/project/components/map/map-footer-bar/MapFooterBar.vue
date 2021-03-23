<template>
  <div v-if="route.path === '/openlayers'">
    <OpenlayersCoordinateViewer />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'MapFooterBar',
  components: {
    OpenlayersCoordinateViewer: defineAsyncComponent(() => import('./coordinate-viewer/CoordinateViewer.vue'))
  },
  setup () {
    const route = useRoute()
    return {
      route
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
