<script setup>
import DepartureSearchBar from "./DepartureSearchBar.vue";
import DepartureSearchList from "./DepartureSearchList.vue";
import SearchLoadingList from "@/components/travel/SearchLoadingList.vue";
import NextBtn from "@/components/travel/NextBtn.vue";
import PreviousBtn from "@/components/travel/PreviousBtn.vue";
import { useMapStore } from "@/stores/mapStore.js";
import { useTravelStore } from "@/stores/travelStore.js";

import { useRouter } from "vue-router";
const mapStore = useMapStore();
const travelStore = useTravelStore();
const router = useRouter();
const onPreviousClick = () => {
  mapStore.resetMarker();
  router.push({ name: "travel-schedule" });
};

const onNextClick = () => {
  mapStore.resetMarker();
  router.push({ name: "travel-search-heritage" });
};
</script>

<template>
  <template class="d-flex ga-2">
    <DepartureSearchBar />
    <DepartureSearchList v-if="mapStore.isKakaoMapLoaded !== undefined" />
    <SearchLoadingList v-if="mapStore.isKakaoMapLoaded === undefined" />

    <template class="d-flex flex-wrap ga-2 flex-row">
      <PreviousBtn @click="onPreviousClick" />
      <NextBtn
        text="문화재 설정하기"
        @click="onNextClick"
        :disabled="travelStore.departure === undefined"
      />
    </template>
  </template>
</template>

<style scoped></style>
