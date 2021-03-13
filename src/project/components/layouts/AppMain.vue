<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script setup>
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */
</script>

<style lang="scss" scoped>

</style>
