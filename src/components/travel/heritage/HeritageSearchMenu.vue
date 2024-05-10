<script setup>
import HeritageSearchBar from "./HeritageSearchBar.vue";
import HeritageSearchList from "./HeritageSearchList.vue";
</script>

<template>
  <template id="map-overlay-view" class="d-flex ga-2">
    <HeritageSearchBar />
    <HeritageSearchList />
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
