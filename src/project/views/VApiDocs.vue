<template>
  <div class="route-view-component">
    <iframe
      class="apidoc-iframe"
      :src="src"
      frameborder="0"
    />
  </div>
</template>

<script>
import { } from 'vue'
import appConfig from '../config/app.config'
export default {
  name: 'VApiDocs',
  setup () {
    const src = appConfig.apiDocsIndexUrl
    return {
      src
    }
  }
}
</script>

<style lang="scss" scoped>
.apidoc-iframe {
  width: 100%;
  height: 100%;
}
</style>
