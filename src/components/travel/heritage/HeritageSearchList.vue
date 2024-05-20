<script setup>
import { onMounted, ref } from "vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { useMapStore } from "@/stores/mapStore.js";

const route = useRoute();
const searchKeyword = ref(route.query.keyword);
const mapStore = useMapStore();

onBeforeRouteUpdate((to, from) => {
  console.log("adasds");
  currentPageIdx.value = 1;
  isEnd.value = false;
  currentItemIdx.value = 0;
  mapStore.resetMarker();
  searchKeyword.value = route.query.keyword;
  items.value = [];
});
</script>

<template>
  <v-card
    class="search-list overflow-y-auto"
    v-if="searchKeyword !== undefined && mapStore.kakaoMap !== undefined"
  >
  </v-card>
  <v-card
    class="search-list overflow-y-auto d-flex justify-center align-center flex-column"
    v-if="searchKeyword === undefined || mapStore.kakaoMap === undefined"
  >
    <v-icon icon="mdi-magnify"></v-icon>
    <div>장소를 검색해주세요!</div>
  </v-card>
</template>

<style scoped>
.search-list {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  width: 100%;
  height: 100%;
}
.search-list::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
  width: 100%;
}
</style>
