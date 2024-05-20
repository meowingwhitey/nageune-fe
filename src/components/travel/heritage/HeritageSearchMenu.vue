<script setup>
import HeritageSearchBar from "./HeritageSearchBar.vue";
import HeritageSearchOption from "./HeritageSearchOption.vue";
import HeritageSearchList from "./HeritageSearchList.vue";
import NextBtn from "@/components/travel/NextBtn.vue";
import PreviousBtn from "@/components/travel/PreviousBtn.vue";
import { useMapStore } from "@/stores/mapStore.js";
import { useRouter } from "vue-router";
const mapStore = useMapStore();
const router = useRouter();
const onPreviousClick = () => {
  router.push({ name: "travel-schedule" });
};

const onNextClick = () => {
  router.push({ name: "travel-search-place" });
};
</script>

<template>
  <template class="d-flex ga-2">
    <!-- <HeritageSearchOption /> -->
    <HeritageSearchBar />
    <HeritageSearchList v-if="mapStore.kakaoMap !== undefined" />
    <SearchLoadingList v-if="mapStore.kakaoMap === undefined" />
    <template class="d-flex flex-wrap ga-2 flex-row">
      <PreviousBtn @click="onPreviousClick" />
      <NextBtn text="경유지 설정하기" @click="onNextClick" />
    </template>
  </template>
</template>

<style scoped></style>
