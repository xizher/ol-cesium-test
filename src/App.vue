<template>
  <el-container class="app-container">
    <el-header style="padding: 0">
      <AppHeader />
    </el-header>
    <el-container>
      <el-container>
        <el-container class="app-main">
          <AppMain />
        </el-container>
        <el-footer
          style="padding: 0"
          height="25px"
        >
          <AppFooter />
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script setup>
/* eslint-disable no-unused-vars */
import AppHeader from './project/components/layouts/AppHeader.vue'
import AppFooter from './project/components/layouts/AppFooter.vue'
import AppMain from './project/components/layouts/AppMain.vue'
/* eslint-enable no-unused-vars */
</script>

<style>

</style>
