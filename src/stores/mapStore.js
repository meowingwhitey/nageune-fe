/**
 * 카카오맵 사용시 필요한 공통적인 함수 및 변수 저장
 */
import { ref, watch } from "vue";
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
  let clusterer = undefined;

  const resetMarker = () => {
    if (clusterer !== undefined) {
      clusterer.clear();
    }
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
    return marker;
  };

  // 카카오맵 객체가 등록될 경우 클러스터 생성
  const drawClusterer = () => {
    if (clusterer !== undefined) {
      clusterer.clear();
    }
    console.log(markerList.value);
    clusterer = new kakao.maps.MarkerClusterer({
      map: kakaoMap.value, // 마커들을 클러스터로 관리하고 표시할 지도 객체
      averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
      minLevel: 10, // 클러스터 할 최소 지도 레벨
    });
    clusterer.addMarkers(markerList.value);
    console.log(clusterer);
  };
  return { kakaoMap, resetMarker, drawMarker, drawClusterer };
});
