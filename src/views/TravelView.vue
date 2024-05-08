<script setup>
/**
 * Vue 3 카카오맵 연동 Reference
 * https://velog.io/@shin-3117/Vue3-%EB%AC%B8%EB%B2%95%EC%9C%BC%EB%A1%9C-Kakao-map-api-%EC%82%AC%EC%9A%A9
 */
import { onMounted, ref } from "vue";

const apiKey = "f40808c2f23c76e300a5745587df8caa";
onMounted(() => {
  // Global 객체로 kakao api가 등록되었으면 지도 초기화
  if (window.kakao && window.kakao.maps) {
    initMap();
  } else {
    // 등록되지 않았으면 동적으로 script를 head에 append 후 로드
    const script = document.createElement("script");
    /* global kakao */
    // api가 모두 로드되었으면 initmap 메서드 실행
    script.onload = () => kakao.maps.load(initMap);
    script.src = `http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${apiKey}&libraries=services`;
    document.head.appendChild(script);
  }
});
const map = ref({});
const initMap = () => {
  const container = document.getElementById("map");
  const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 5,
  };

  // 지도 객체를 등록합니다.
  // 지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
  map.value = new kakao.maps.Map(container, options);
};
import MapSearchMenu from "@/components/travel/MapSearchMenu.vue";
import MapLoginBtn from "@/components/travel/MapLoginBtn.vue";
import MapNavBar from "@/components/travel/MapNavBar.vue";
import MapSizingBtn from "@/components/travel/MapSizingBtn.vue";

const onSearch = (keyword) => {
  ps.keywordSearch(keyword, (data, status, pagination) => {
    console.log(data);
  });
};
</script>

<template>
  <MapNavBar />
  <MapSearchMenu :map="map" />
  <MapLoginBtn />
  <MapSizingBtn :map="map" />
  <div id="map"></div>
</template>

<style scoped>
#map {
  padding: 0px;
  margin: 0px;
  min-height: 100vh;
  min-width: 100vw;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

#map::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}
</style>
