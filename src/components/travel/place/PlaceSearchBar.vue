<script setup>
import { ref } from "vue";
import { usePlaceSearchStore } from "@/stores/placeSearchStore.js";

const store = usePlaceSearchStore();

const searchKeyword = ref("");
const onSearch = () => {
  if (store.searchKeyword === searchKeyword.value) {
    return;
  }
  console.log(
    `store.searchKeyword: ${store.searchKeyword} , searchKeyword.value: ${searchKeyword.value}`,
  );
  store.searchKeyword = searchKeyword.value;
};
</script>

<template>
  <v-card id="map-search-bar">
    <v-text-field
      density="compact"
      append-inner-icon="mdi-magnify"
      :label="`경유지 검색`"
      variant="solo"
      hide-details
      single-line
      v-model="searchKeyword"
      @keydown.enter="onSearch"
    ></v-text-field>
  </v-card>
</template>

<style scoped>
#map-search-bar {
  width: 100%;
  padding: 0px;
  display: flex;
  align-items: center;
}
</style>
