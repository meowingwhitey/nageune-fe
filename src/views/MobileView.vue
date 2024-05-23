<script setup>
import { RouterView } from "vue-router";
import MobileHeader from "@/components/mobile/MobileHeader.vue";
</script>

<template>
  <div id="mobile-view">
    <MobileHeader />
    <RouterView />
  </div>
</template>

<style scoped>
#mobile-view {
  min-height: 100vh;
  background-color: #fff;
}
</style>
