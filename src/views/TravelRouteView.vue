<script setup>
import TravelRouteMenu from "@/components/travel/route/TravelRouteMenu.vue";
</script>

<template>
  <v-card class="route-list-menu">
    <div
      class="d-flex ga-2 row"
      style="overflow-x: scroll; height: 100%; padding: 15px"
    >
      <TravelRouteMenu />
    </div>
  </v-card>
</template>

<style scoped>
.route-list-menu {
  position: fixed;
  z-index: 900;
  flex-direction: row;
  left: 110px;
  top: 40px;
  max-width: calc(100vw - 250px);
  height: calc(100vh - 80px);
}
</style>
