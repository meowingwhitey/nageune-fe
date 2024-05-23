<script setup>
import DepartureSearchListItem from "@/components/travel/departure/DepartureSearchListItem.vue";
import { useMapStore } from "@/stores/mapStore";
import { ref, onMounted, watch } from "vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { API_SERVER_URL } from "@/data/urls.js";

// 여기는 서드파티 서버로 보내므로 그냥 axios 사용
// import { localAxios } from "@/util/axios_interceptor";
// const axios = localAxios();

import axios from "axios";

const route = useRoute();
const items = ref([]);
const mapStore = useMapStore();
const currentPageIdx = ref(1);
const isEnd = ref(false);
const currentItemIdx = ref(0);
const isLoading = ref(false);

const searchKeyword = ref(route.query.keyword);
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
    resetAndFetch().then(() => next());
  } else {
    next();
  }
});

onMounted(() => {
  if (!searchKeyword.value) return;
  resetAndFetch();
});

const api = async (keyword, pageSize = 15) => {
  if (isEnd.value || !keyword || isLoading.value) {
    return [];
  }

  isLoading.value = true;
  const url = `http://dapi.kakao.com/v2/local/search/keyword.json?query=${keyword}&page=${currentPageIdx.value}&size=${pageSize}`;
  const response = await axios(url, {
    method: "GET",
    headers: {
      Authorization: "KakaoAK f40808c2f23c76e300a5745587df8caa",
      KA: "sdk/4.4.15 os/javascript lang/ko-KR device/MacIntel origin/http%3A%2F%2Flocalhost%3A5500",
    },
  });

  isEnd.value = response.data.meta.is_end;
  const data = response.data.documents;

  if (data.length === 0 || data.length < pageSize) {
    isEnd.value = true;
  }

  const bounds = new kakao.maps.LatLngBounds();

  data.forEach((place) => {
    bounds.extend(new kakao.maps.LatLng(place.y, place.x));
    mapStore.drawMarker(place.place_name, place.y, place.x);
  });

  for (let dataIdx = 0; dataIdx < data.length; dataIdx++) {
    await (async () => {
      const place = data[dataIdx];
      const imageSearchUrl = `https://dapi.kakao.com/v2/search/image?query=${place.place_name}&page=1&size=1`;
      const imageSearchResponse = await axios(imageSearchUrl, {
        method: "GET",
        headers: {
          Authorization: "KakaoAK 2eceec41240f771867bfbadce050a69b",
          KA: "sdk/4.4.15 os/javascript lang/ko-KR device/MacIntel origin/http%3A%2F%2Flocalhost%3A5500",
        },
      });
      const imageUrl =
        imageSearchResponse.data.documents.length > 0
          ? imageSearchResponse.data.documents[0].thumbnail_url
          : "";
      console.log(imageUrl);
      data[dataIdx].imageUrl = imageUrl;
    })();
  }

  if (data.length > 0) {
    window.kakaoMap.setBounds(bounds);
  }

  currentPageIdx.value++;
  currentItemIdx.value += data.length;
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
      <DepartureSearchListItem
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
    <div>키워드 입력 후 검색해주세요</div>
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
