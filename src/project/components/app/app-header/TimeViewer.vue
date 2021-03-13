<template>
  <div
    v-if="visible"
    style="margin-left: auto"
  >
    {{ timeFormat }}
  </div>
</template>

<script>
import { } from 'vue'
import appConfig from '../../../config/app.config'
import { useTimeFormat } from '../../../../zhd/dist/vue-hooks/time.hooks'
export default {
  name: 'TimeViewer',
  setup () {
    const { appHeaderConfig: config } = appConfig
    const { visible, format } = config.timeConfig
    const timeFormat = useTimeFormat(format)
    return {
      timeFormat, visible
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
