<script setup>
import { usePlaceSearchStore } from "@/stores/placeSearchStore.js";
import PlaceSearchListItem from "./PlaceSearchListItem.vue";
import { ref } from "vue";
const store = usePlaceSearchStore();
/**
 * TODO
 * 검색 결과가 없는 값을 입력 후, 검색 결과가 있는 값을 입력하면
 * alert 컴포넌트도 없이 바로 공백이 뜸
 */

// window의 전체 크기에서 상하 띄워져 있는 크기인 80px만큼을 빼고
// 무한스크롤 시 생기는 padding 제거를 위해 16px를 더해줌
const height = ref(window.innerHeight - 80 + 16);
</script>

<template>
  <v-card
    id="place-search-list"
    class="overflow-y-auto"
    v-if="store.searchKeyword !== ''"
  >
    <!--
    [Vuetify 무한 스크롤 적용]
    https://vuetifyjs.com/en/components/infinite-scroller/
    -->
    <v-infinite-scroll
      color="primary"
      :height="height"
      :items="store.items"
      side="end"
      :onLoad="store.load"
    >
      <PlaceSearchListItem
        v-for="(spot, index) in store.items"
        :listSize="store.items.length"
        :index="index"
        :spot="spot"
      />
      <template
        v-slot:empty
        style="display: flex; align-items: center; justify-content: center"
      >
        <v-alert
          v-if="store.currentItemIdx > 0 && store.isEnd == true"
          density="compact"
          type="success"
          variant="tonal"
          >목록의 마지막입니다.</v-alert
        >
        <v-alert
          v-if="store.currentItemIdx == 0 && store.isEnd == true"
          density="compact"
          type="error"
          variant="tonal"
          >검색 결과가 없습니다.</v-alert
        >
      </template>
      <template v-slot:error>
        <v-alert density="compact" type="error" variant="tonal"
          >오류가 발생했습니다.</v-alert
        >
      </template>
    </v-infinite-scroll>
  </v-card>
  <v-card
    id="place-search-list"
    class="overflow-y-auto d-flex justify-center align-center flex-column"
    v-if="store.searchKeyword === ''"
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
