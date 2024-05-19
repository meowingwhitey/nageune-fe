<script setup>
import { onMounted } from "vue";
import { useTravelStore } from "@/stores/travelStore.js";
import { useSearchStore } from "@/stores/searchStore.js";
/**
 * 카카오맵 사용시 문화재 검색에 필요한 event가 있음
 * 반대로 경유지 검색에 필요한 event도 있음
 * onMounted 내에서 해당 event를 등록하거나 해제하는 역할
 */
const travelStore = useTravelStore();
const searchStore = useSearchStore();
onMounted(() => {
  //searchStore.resetMarker();
  searchStore.drawMarker();
  window.kakao.maps.event.addListener(window.kakaoMap, "mouseup", async () => {
    //searchStore.resetMarker();
    searchStore.drawMarker();
  });
});
</script>

<template>
  <v-card
    id="place-search-list"
    class="overflow-y-auto d-flex justify-center align-center flex-column"
  >
    <v-icon icon="mdi-magnify"></v-icon>
    <div>장소를 검색해주세요!</div>
  </v-card>
</template>

<style scoped>
#place-search-list {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  width: 100%;
  height: 100%;
}
#place-search-list::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
  width: 100%;
}
</style>
