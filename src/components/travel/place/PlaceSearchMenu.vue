<script setup>
import PlaceSearchBar from "./PlaceSearchBar.vue";
import PlaceSearchList from "./PlaceSearchList.vue";

const props = defineProps(["keyword"]);
</script>

<template>
  <template class="d-flex ga-2">
    <PlaceSearchBar />
    <PlaceSearchList :keyword="props.keyword" />
  </template>
</template>

<style scoped></style>
