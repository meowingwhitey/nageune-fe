<script setup>
import HeritageSearchBar from "./HeritageSearchBar.vue";
import HeritageSearchOption from "./HeritageSearchOption.vue";
import HeritageSearchList from "./HeritageSearchList.vue";
import SearchLoadingList from "@/components/travel/SearchLoadingList.vue";
import NextBtn from "@/components/travel/NextBtn.vue";
import PreviousBtn from "@/components/travel/PreviousBtn.vue";
import { useMapStore } from "@/stores/mapStore.js";
import { useTravelStore } from "@/stores/travelStore.js";
import { useRouter } from "vue-router";
const travelStore = useTravelStore();
const mapStore = useMapStore();
const router = useRouter();
const onPreviousClick = () => {
  mapStore.resetMarker();
  router.push({ name: "travel-departure" });
};

const onNextClick = () => {
  mapStore.resetMarker();
  router.push({ name: "travel-search-place" });
};
</script>

<template>
  <template class="d-flex ga-2">
    <!-- <HeritageSearchOption /> -->
    <HeritageSearchBar />
    <HeritageSearchList v-if="mapStore.isKakaoMapLoaded" />
    <SearchLoadingList v-if="!mapStore.isKakaoMapLoaded" />
    <template class="d-flex flex-wrap ga-2 flex-row">
      <PreviousBtn @click="onPreviousClick" />
      <NextBtn
        v-if="travelStore.departure === undefined"
        :disabled="true"
        text="경유지 설정하기"
        @click="onNextClick"
      />
      <NextBtn
        v-if="travelStore.departure !== undefined"
        :disabled="false"
        text="경유지 설정하기"
        @click="onNextClick"
      />
    </template>
  </template>
</template>

<style scoped></style>
