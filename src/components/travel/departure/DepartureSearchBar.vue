<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const searchKeyword = ref(route.query.keyword);
const onSearch = () => {
  if (searchKeyword === undefined) {
    return;
  }
  router.push({
    name: "travel-departure",
    query: {
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
      :label="`출발지를 입력해주세요`"
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
