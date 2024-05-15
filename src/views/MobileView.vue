<script setup>
import { RouterView } from "vue-router";
import MobileHeader from "@/components/mobile/MobileHeader.vue";
</script>

<template>
  <div>
    <MobileHeader />
    <RouterView />
  </div>
</template>

<style scoped></style>
