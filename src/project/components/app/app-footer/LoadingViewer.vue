<template>
  <div>
    <i
      v-if="loading"
      class="el-icon-loading"
    />
    <i
      v-else
      class="el-icon-remove-outline"
    />
  </div>
</template>

<script>
import { } from 'vue'
import { useloadingState } from '../../../../zhd/dist/vue-hooks/loading.hooks'
export default {
  name: 'LoadViewer',
  setup () {
    const loading = useloadingState()
    return {
      loading
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
