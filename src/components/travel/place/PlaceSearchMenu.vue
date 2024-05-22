<script setup>
import PlaceSearchBar from "./PlaceSearchBar.vue";
import PlaceSearchList from "./PlaceSearchList.vue";
import SearchLoadingList from "@/components/travel/SearchLoadingList.vue";
import NextBtn from "@/components/travel/NextBtn.vue";
import PreviousBtn from "@/components/travel/PreviousBtn.vue";
import { useMapStore } from "@/stores/mapStore.js";
import { useRouter } from "vue-router";
const mapStore = useMapStore();
const router = useRouter();
const onPreviousClick = () => {
  mapStore.resetMarker();
  router.push({ name: "travel-search-heritage" });
};

const onNextClick = () => {
  mapStore.resetMarker();
  router.push({ name: "travel-route" });
};
</script>

<template>
  <template class="d-flex ga-2">
    <PlaceSearchBar />
    <PlaceSearchList v-if="mapStore.isKakaoMapLoaded !== undefined" />
    <SearchLoadingList v-if="mapStore.isKakaoMapLoaded === undefined" />

    <template class="d-flex flex-wrap ga-2 flex-row">
      <PreviousBtn @click="onPreviousClick" />
      <NextBtn text="경로 설정하기" @click="onNextClick" />
    </template>
  </template>
</template>

<style scoped></style>
