<script setup>
const props = defineProps(["search", "keyword"]);

import EraRangeBar from "@/components/travel/heritage/EraRangeBar.vue";
import HeritageSearchMenu from "@/components/travel/heritage/HeritageSearchMenu.vue";

import CategoryChipList from "@/components/travel/place/CategoryChipList.vue";
import PlaceSearchMenu from "@/components/travel/place/PlaceSearchMenu.vue";

import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useMapStore } from "@/stores/mapStore";
const mapStore = useMapStore();
</script>

<template>
  <PlaceSearchMenu v-if="mapStore.isKakaoMapLoaded" class="search-menu" />
</template>

<style scoped>
.option-bar {
  position: fixed;
  left: 385px;
  top: 40px;
  height: calc(100vh - 80px);
  width: 60px;
  flex-direction: column;
  display: flex;
  z-index: 900;
  background-color: white;
}
.search-menu {
  position: fixed;
  z-index: 900;
  flex-direction: column;
  left: 110px;
  top: 40px;
  height: calc(100vh - 80px);
  width: 265px;
}
</style>
