<script setup>
import TravelRouteMenu from "@/components/travel/route/TravelRouteMenu.vue";

import { useMapStore } from "@/stores/mapStore";
const mapStore = useMapStore();
</script>

<template>
  <TravelRouteMenu v-if="mapStore.isKakaoMapLoaded" class="route-list-menu" />
</template>

<style scoped>
.route-list-menu {
  position: fixed;
  z-index: 900;
  flex-direction: column;
  left: 110px;
  top: 40px;
  max-width: calc(100vw - 60vw);
  height: calc(100vh - 80px);
}
</style>
