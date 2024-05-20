<script setup>
import PlaceSearchListItem from "./PlaceSearchListItem.vue";
import { useMapStore } from "@/stores/mapStore";
import { ref, onMounted } from "vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import axios from "axios";

const route = useRoute();
const items = ref([]);
const mapStore = useMapStore();
const currentPageIdx = ref(1);
const isEnd = ref(false);
const currentItemIdx = ref(0);

const searchKeyword = ref(route.query.keyword);

onBeforeRouteUpdate((to, from) => {
  currentPageIdx.value = 1;
  isEnd.value = false;
  currentItemIdx.value = 0;
  mapStore.resetMarker();
  searchKeyword.value = to.query.keyword;
  items.value = [];
});

/**
 * https://developers.kakao.com/docs/latest/ko/local/dev-guide#search-by-keyword
 */
const api = async (keyword, pageSize = 15) => {
  if (keyword === "" || keyword == undefined || isEnd.value) {
    return [];
  }
  const url = `http://dapi.kakao.com/v2/local/search/keyword.json?query=${keyword}&page=${currentPageIdx.value}&size=${pageSize}`;
  const response = await axios(url, {
    method: "GET",
    headers: {
      Authorization: "KakaoAK f40808c2f23c76e300a5745587df8caa",
      KA: "sdk/4.4.15 os/javascript lang/ko-KR device/MacIntel origin/http%3A%2F%2Flocalhost%3A5500",
    },
  });
  const json = response.data;
  const data = json.documents;
  const bounds = new kakao.maps.LatLngBounds();

  data.forEach((place) => {
    bounds.extend(new kakao.maps.LatLng(place.y, place.x));
    mapStore.drawMarker(place.place_name, place.y, place.x);
  });

  // 현재 검색 결과가 최대인지 확인용
  isEnd.value = json.meta.is_end;
  currentPageIdx.value = currentPageIdx.value + 1;
  currentItemIdx.value = currentItemIdx.value + data.length;

  // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
  // 이때, 이전 검색 결과를 포함하여 검색 결과가 존재할 때만 변경
  if (currentItemIdx.value > 0) {
    mapStore.kakaoMap.setBounds(bounds);
  }
  return data;
};

const load = async ({ done }) => {
  // Perform API call
  const res = await api(route.query.keyword);
  if (res.length > 0) {
    items.value.push(...res);
    done("ok");
  }
  done("empty");
};

// window의 전체 크기에서 상하 띄워져 있는 크기인 80px만큼을 빼고
// 무한스크롤 시 생기는 padding 제거를 위해 16px를 더해줌
const height = ref(window.innerHeight - 80 + 16);
</script>

<template>
  <v-card
    class="search-list overflow-y-auto"
    v-if="
      searchKeyword !== '' &&
      searchKeyword !== undefined &&
      mapStore.kakaoMap !== undefined
    "
  >
    <!--
    [Vuetify 무한 스크롤 적용]
    https://vuetifyjs.com/en/components/infinite-scroller/
    -->
    <v-infinite-scroll
      color="primary"
      :height="height"
      :items="items"
      side="end"
      @load="load"
    >
      <PlaceSearchListItem
        v-for="(spot, index) in items"
        :listSize="items.length"
        :index="index"
        :spot="spot"
      />
      <template
        v-slot:empty
        style="display: flex; align-items: center; justify-content: center"
      >
        <v-alert
          v-if="currentItemIdx > 0 && isEnd == true"
          density="compact"
          type="success"
          variant="tonal"
          >목록의 마지막입니다.</v-alert
        >
        <v-alert
          v-if="currentItemIdx == 0 && isEnd == true"
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
    class="search-list overflow-y-auto d-flex justify-center align-center flex-column"
    v-if="searchKeyword === '' || searchKeyword === undefined"
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
