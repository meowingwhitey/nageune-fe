<script setup>
import PlaceSearchListItem from "./PlaceSearchListItem.vue";
import { useTravelStore } from "@/stores/travelStore";
import { ref } from "vue";

const props = defineProps(["keyword"]);

const items = ref([]);

const currentPageIdx = ref(1);
const isEnd = ref(false);
const currentItemIdx = ref(0);

const travelStore = useTravelStore();

/**
 * https://developers.kakao.com/docs/latest/ko/local/dev-guide#search-by-keyword
 */
const api = async (keyword, pageSize = 15) => {
  if (keyword === "" || isEnd.value) {
    return [];
  }
  const url = `http://dapi.kakao.com/v2/local/search/keyword.json?query=${keyword}&page=${currentPageIdx.value}&size=${pageSize}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "KakaoAK f40808c2f23c76e300a5745587df8caa",
      KA: "sdk/4.4.15 os/javascript lang/ko-KR device/MacIntel origin/http%3A%2F%2Flocalhost%3A5500",
    },
  });
  const json = await response.json();
  const data = json.documents;
  const bounds = new window.kakao.maps.LatLngBounds();

  for (let i = 0; i < data.length; i++) {
    displayMarker(data[i]);
    bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
    // const categoryIdx = categoryItemList.codes.indexOf(
    //   data[i].category_group_code,
    // );
    // categoryCheckList.value[categoryIdx] = true;
    // categoryExistList.value[categoryIdx] = true;
  }
  // 현재 검색 결과가 최대인지 확인용
  isEnd.value = json.meta.is_end;
  currentPageIdx.value = currentPageIdx.value + 1;
  currentItemIdx.value = currentItemIdx.value + data.length;

  // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
  // 이때, 이전 검색 결과를 포함하여 검색 결과가 존재할 때만 변경
  /**
   * [Problem]
   * TravelView에서 window.kakaoMap 객체을 생성
   * window.kakaoMap 생성보다 SearchList 컴포넌트가 먼저 생성되고 결과를 받아옴
   *
   * [Solve]
   * 1. map 객체를 store에 저장해서 전역적으로 관리
   * 2. store 내 map 객체가 초기화되지 않았다면 로딩 애니메이션
   */
  if (currentItemIdx.value > 0) {
    window.kakaoMap.setBounds(bounds);
  }
  return data;
};

const load = async ({ done }) => {
  // Perform API call
  const res = await api(props.keyword);
  console.log(res.length, currentItemIdx.value);
  if (res.length > 0) {
    items.value.push(...res);
    done("ok");
  }
  /* 추후 에러 헨들링시 사용 */
  // if (????) {
  //   done("error");
  // }
  done("empty");
};

// 지도에 마커를 표시하는 함수입니다
const displayMarker = (place) => {
  // 마커를 생성하고 지도에 표시합니다
  const marker = new kakao.maps.Marker({
    map: window.kakaoMap,
    position: new kakao.maps.LatLng(place.y, place.x),
  });

  // 마커에 클릭이벤트를 등록합니다
  kakao.maps.event.addListener(marker, "click", function () {
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    if (place.isInfoWindowOpen) {
      infowindow.close();
      place.isInfoWindowOpen = false;
      return;
    }
    // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
    infowindow.setContent(
      '<div style="padding:5px;font-size:12px;">' + place.place_name + "</div>",
    );
    infowindow.open(kakaoMap.value, marker);
    place.isInfoWindowOpen = true;
  });
};

// window의 전체 크기에서 상하 띄워져 있는 크기인 80px만큼을 빼고
// 무한스크롤 시 생기는 padding 제거를 위해 16px를 더해줌
const height = ref(window.innerHeight - 80 + 16);

console.log(props);
</script>

<template>
  <v-card
    id="place-search-list"
    class="overflow-y-auto"
    v-if="props.keyword !== undefined && travelStore.kakaoMap !== undefined"
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
      :onLoad="load"
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
    id="place-search-list"
    class="overflow-y-auto d-flex justify-center align-center flex-column"
    v-if="props.keyword === undefined"
  >
    <v-icon icon="mdi-magnify"></v-icon>
    <div>장소를 검색해주세요!</div>
  </v-card>

  <!-- 카카오맵 로딩 전 -->
  <v-card
    id="place-search-list"
    class="overflow-y-auto d-flex justify-center align-center flex-column"
    v-if="travelStore.kakaoMap === undefined"
  >
    <v-progress-circular color="primary" indeterminate></v-progress-circular>
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
