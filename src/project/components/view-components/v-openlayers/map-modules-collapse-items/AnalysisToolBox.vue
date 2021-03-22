<template>
  <div>
    <StationsRoutesWithinBound />
  </div>
</template>

<script>
import { defineAsyncComponent, defineComponent } from 'vue'
// import StationsRoutesWithinBound from './analysis-tool-box/StationsRoutesWithinBound.vue'

export default defineComponent({
  name: 'AnalysisToolBox',
  components: {
    StationsRoutesWithinBound: defineAsyncComponent(() => import('./analysis-tool-box/stations-routes-within-bound/StationsRoutesWithinBound.vue')),
  },
  setup () {

    return {
    }
  },
})
</script>

<style lang="scss" scoped>

</style>
