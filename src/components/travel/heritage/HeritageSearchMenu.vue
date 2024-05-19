<script setup>
import HeritageSearchBar from "./HeritageSearchBar.vue";
import HeritageSearchOption from "./HeritageSearchOption.vue";
import HeritageSearchList from "./HeritageSearchList.vue";
import { useTravelStore } from "@/stores/travelStore.js";
const travelStore = useTravelStore();
const props = defineProps(["keyword"]);
</script>

<template>
  <template class="d-flex ga-2">
    <!-- <HeritageSearchOption /> -->
    <HeritageSearchBar />
    <HeritageSearchList
      :keyword="props.keyword"
      v-if="travelStore.kakaoMap !== undefined"
    />
    <SearchLoadingList v-if="travelStore.kakaoMap === undefined" />
  </template>
</template>

<style scoped></style>
