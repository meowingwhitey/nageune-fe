<script setup>
import PlaceSearchBar from "./PlaceSearchBar.vue";
import PlaceSearchList from "./PlaceSearchList.vue";
import SearchLoadingList from "@/components/travel/SearchLoadingList.vue";
import { onMounted } from "vue";

import { useTravelStore } from "@/stores/travelStore.js";

const travelStore = useTravelStore();
const props = defineProps(["keyword"]);

/**
 * 카카오맵 사용시 문화재 검색에 필요한 event가 있음
 * 반대로 경유지 검색에 필요한 event도 있음
 * onMounted 내에서 해당 event를 등록하거나 해제하는 역할
 */
onMounted(() => {});
</script>

<template>
  <template class="d-flex ga-2">
    <PlaceSearchBar />

    <PlaceSearchList
      :keyword="props.keyword"
      v-if="travelStore.kakaoMap !== undefined"
    />
    <SearchLoadingList v-if="travelStore.kakaoMap === undefined" />
  </template>
</template>

<style scoped></style>
