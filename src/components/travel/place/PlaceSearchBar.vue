<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useSearchStore } from "@/stores/searchStore.js";
const searchKeyword = ref("");
const router = useRouter();
const searchStore = useSearchStore();
const onSearch = () => {
  router.push({
    name: "travel-search",
    query: {
      search: "place",
      keyword: searchKeyword.value,
    },
  });
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
