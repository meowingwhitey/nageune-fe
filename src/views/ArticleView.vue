<script setup>
import { RouterView } from "vue-router";
import HeaderComponent from "@/components/includes/HeaderComponent.vue";
import FooterComponent from "@/components/includes/FooterComponent.vue";
</script>

<template>
  <HeaderComponent />
  <RouterView />
  <FooterComponent />
</template>

<style scoped></style>
