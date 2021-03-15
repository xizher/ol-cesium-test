<template>
  <div>
    <StationsRoutesWithinBound />
  </div>
</template>

<script>
import { defineAsyncComponent, defineComponent, ref } from 'vue'
// import StationsRoutesWithinBound from './analysis-tool-box/StationsRoutesWithinBound.vue'

export default defineComponent({
  name: 'AnalysisToolBox',
  components: {
    StationsRoutesWithinBound: defineAsyncComponent(() => import('./analysis-tool-box/StationsRoutesWithinBound.vue'))
  },
  setup () {

    const tools = [
      { name: '统计指定行政区范围内的站点或线路', modelVisible: ref(false) },
    ]

    return {
      tools
    }
  },
})
</script>

<style lang="scss" scoped>

</style>
