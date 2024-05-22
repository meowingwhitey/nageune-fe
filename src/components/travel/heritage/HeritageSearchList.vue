<script setup>
import HeritageSearchListItem from "./HeritageSearchListItem.vue";
import PlaceSearchListItem from "@/components/travel/place/PlaceSearchListItem.vue";
import { useMapStore } from "@/stores/mapStore";
import { ref, onMounted, watch } from "vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { API_SERVER_URL } from "@/data/urls.js";

import { localAxios } from "@/util/axios_interceptor";

const axios = localAxios();

const route = useRoute();
const items = ref([]);
const mapStore = useMapStore();
const currentPageIdx = ref(1);
const isEnd = ref(false);
const currentItemIdx = ref(0);
const isLoading = ref(false);

const searchKeyword = ref(route.query.keyword);
const startEraCode = ref(route.query.startEraCode || 0);
const endEraCode = ref(route.query.endEraCode || 100);

const resetAndFetch = async () => {
  if (!searchKeyword.value || isLoading.value) return;
  currentPageIdx.value = 1;
  isEnd.value = false;
  currentItemIdx.value = 0;
  items.value = [];
  mapStore.resetMarker();
  await load({ done: () => {} });
};

onBeforeRouteUpdate((to, from, next) => {
  if (to.query.keyword !== searchKeyword.value) {
    searchKeyword.value = to.query.keyword;
    startEraCode.value = to.query.startEraCode || 0;
    endEraCode.value = to.query.endEraCode || 100;
    resetAndFetch().then(() => next());
  } else {
    next();
  }
});

onMounted(() => {
  if (!searchKeyword.value) return;
  resetAndFetch();
});

const api = async (keyword, pageSize = 9999999) => {
  if (isEnd.value || !keyword || isLoading.value) {
    return [];
  }

  isLoading.value = true;
  const url = `/heritage/search?`;

  const response = await axios(url, {
    method: "GET",
    params: {
      keyword,
      startEraCode: startEraCode.value,
      endEraCode: endEraCode.value,
      pageSize,
      lastIdx: currentItemIdx.value,
    },
  });

  const data = response.data.results;

  if (data.length === 0 || data.length < pageSize) {
    isEnd.value = true;
  }

  const bounds = new kakao.maps.LatLngBounds();

  data.forEach((place) => {
    bounds.extend(new kakao.maps.LatLng(place.latitude, place.longitude));
    mapStore.drawMarker(place.title, place.latitude, place.longitude);
  });

  if (data.length > 0) {
    currentPageIdx.value++;
    currentItemIdx.value += data.length;
    window.kakaoMap.setBounds(bounds);
  }

  mapStore.drawClusterer();
  isLoading.value = false;
  return data;
};

const load = async ({ done }) => {
  const res = await api(searchKeyword.value);
  if (res.length > 0) {
    items.value.push(...res);
    done("ok");
  } else {
    done("empty");
  }
};

const height = ref(window.innerHeight - 80 + 16);
</script>

<template>
  <v-card
    class="search-list overflow-y-auto"
    v-if="
      searchKeyword !== undefined && mapStore.isKakaoMapLoaded !== undefined
    "
  >
    <v-infinite-scroll
      color="primary"
      :height="height"
      :items="items"
      side="end"
      mode="manual"
      @load="load"
    >
      <HeritageSearchListItem
        v-for="(spot, index) in items"
        :key="index"
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
        >
          목록의 마지막입니다.
        </v-alert>
        <v-alert
          v-if="currentItemIdx == 0 && isEnd == true"
          density="compact"
          type="error"
          variant="tonal"
        >
          검색 결과가 없습니다.
        </v-alert>
      </template>
      <template v-slot:error>
        <v-alert density="compact" type="error" variant="tonal">
          오류가 발생했습니다.
        </v-alert>
      </template>
    </v-infinite-scroll>
  </v-card>
  <v-card
    class="search-list overflow-y-auto d-flex justify-center align-center flex-column"
    v-if="
      searchKeyword === undefined || mapStore.isKakaoMapLoaded === undefined
    "
  >
    <v-icon icon="mdi-magnify"></v-icon>
    <div>지금 조건으로 검색하기</div>
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
