/**
 * 카카오맵 사용시 필요한 공통적인 함수 및 변수 저장
 */
import { ref } from "vue";
import { defineStore } from "pinia";

export const useMapStore = defineStore("mapStore", () => {
  // 맵의 현 위치 center, border 정보 저장
  const locationRangeCoord = ref({
    latStart: 0,
    latEnd: 0,
    lngStart: 0,
    lngEnd: 0,
    latCenter: 0,
    lngCenter: 0,
  });
  const kakaoMap = ref(undefined);
  const markerList = ref([]); // 생성된 마커 저장

  const resetMarker = () => {
    markerList.value.forEach((marker) => {
      marker.setMap(null);
    });
    markerList.value = [];
  };

  const drawMarker = (name, lat, lng) => {
    // 마커를 생성하고 지도에 표시합니다
    const marker = new kakao.maps.Marker({
      map: kakaoMap.value,
      position: new kakao.maps.LatLng(lat, lng),
    });

    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    infowindow.setContent(
      '<div style="padding:5px;font-size:12px;">' + name + "</div>",
    );

    kakao.maps.event.addListener(marker, "mouseover", function () {
      infowindow.open(kakaoMap.value, marker);
    });

    kakao.maps.event.addListener(marker, "mouseout", function () {
      infowindow.close();
    });

    markerList.value.push(marker);
  };

  return { kakaoMap, resetMarker, drawMarker };
});
