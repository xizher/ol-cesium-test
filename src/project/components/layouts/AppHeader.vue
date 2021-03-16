<template>
  <div class="app-header">
    <div class="app-header-title">
      {{ config.title }}
    </div>
    <el-divider direction="vertical" />
    <el-menu
      :default-active="defaultActive"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item
        v-for="(item, index) in menuItems"
        :key="index"
        :index="item.path"
      >
        {{ item.name }}
      </el-menu-item>
    </el-menu>
    <TimeViewer />
  </div>
</template>

<script setup>
/* eslint-disable no-unused-vars */
import { } from 'vue'
import TimeViewer from '../app/app-header/TimeViewer.vue'
import { useRouter } from 'vue-router'
import appConfig from '../../config/app.config'
const { appHeaderConfig: config } = appConfig
const { defaultActive, menuItems } = config.menuConfig
const router = useRouter()
router.push(defaultActive)
const handleSelect = path => router.push(path)
/* eslint-enable no-unused-vars */
</script>

<style lang="scss" scoped>
.app-header {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 16px;
  background-color: #fff;
  .app-header-title {
    font-weight: bold;
    font-size: 20px;
  }
}
</style>
