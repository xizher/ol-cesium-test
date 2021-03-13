<template>
  <div class="app-footer">
    <LoadViewer />
    <el-divider direction="vertical" />
    <MapFooterBar />
    <el-divider direction="vertical" />
  </div>
</template>

<script setup>
/* eslint-disable no-unused-vars */
import MapFooterBar from '../map/map-footer-bar/MapFooterBar.vue'
import LoadViewer from '../app/app-footer/LoadViewer.vue'
/* eslint-enable no-unused-vars */
</script>

<style lang="scss" scoped>
.app-footer {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 8px;
  background-color: #fff;
}
</style>
