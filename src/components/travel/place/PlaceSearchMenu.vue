<script setup>
import PlaceSearchBar from "./PlaceSearchBar.vue";
import PlaceSearchList from "./PlaceSearchList.vue";
</script>

<template>
  <template id="map-overlay-view" class="d-flex ga-2">
    <PlaceSearchBar />
    <PlaceSearchList />
  </template>
</template>

<style scoped>
#map-overlay-view {
  position: fixed;
  z-index: 900;
  flex-direction: column;
  left: 110px;
  top: 40px;
  height: calc(100vh - 80px);
  width: 265px;
}
</style>
