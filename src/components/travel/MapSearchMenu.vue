<script setup>
import { ref } from "vue";
import SpotSearchBar from "./SpotSearchBar.vue";
import SpotSearchList from "./SpotSearchList.vue";
import KeywordChipList from "./KeywordChipList.vue";

const tab = ref("one");
const props = defineProps(["map"]);
const searchResultList = ref([]);
const searchSpot = (searchKeyword) => {
  const placeSearchInstance = new window.kakao.maps.services.Places();

  placeSearchInstance.keywordSearch(
    searchKeyword,
    (data, status, pagination) => {
      if (status === window.kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new window.kakao.maps.LatLngBounds();
        searchResultList.value = data;
        for (var i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
        }

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        props.map.setBounds(bounds);
      }
    },
  );
};
// 지도에 마커를 표시하는 함수입니다
function displayMarker(place) {
  // 마커를 생성하고 지도에 표시합니다
  var marker = new kakao.maps.Marker({
    map: props.map,
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
    infowindow.open(props.map, marker);
    place.isInfoWindowOpen = true;
  });
}
</script>

<template>
  <template id="map-overlay-view" class="d-flex ga-2">
    <SpotSearchBar @on-search="searchSpot" />
    <KeywordChipList />
    <SpotSearchList :spotList="searchResultList" />
  </template>
</template>

<style scoped>
#map-overlay-view {
  position: fixed;
  z-index: 900;
  flex-direction: column;
  left: 110px;
  top: 40px;
  height: calc(100vh - 80px);
  width: 265px;
}
</style>
