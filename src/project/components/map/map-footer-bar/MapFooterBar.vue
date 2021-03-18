<template>
  <div v-if="route.path === '/'">
    <div id="coordinate-viewer" />
  </div>
</template>

<script>
import { } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'MapFooterBar',
  components: {
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
