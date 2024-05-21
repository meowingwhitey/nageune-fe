<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const searchKeyword = ref("");
const router = useRouter();
const route = useRoute();

const onSearch = () => {
  router.push({
    name: "travel-search-heritage",
    query: {
      keyword: searchKeyword.value,
      startEraCode: route.query.startEraCode || 0,
      endEraCode: route.query.endEraCode || 100,
    },
  });
};
</script>

<template>
  <v-card id="map-search-bar">
    <v-text-field
      density="compact"
      append-inner-icon="mdi-magnify"
      :label="`문화재 검색`"
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
