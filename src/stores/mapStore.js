/**
 * 카카오맵 사용시 필요한 공통적인 함수 및 변수 저장
 */
import { ref, watch } from "vue";
import { defineStore } from "pinia";

export const useMapStore = defineStore("mapStore", () => {
  const kakaoMap = undefined;
  // kakaoMap 객체 자체를 ref로 등록시키면 카카오맵 내부 객체 수정시 지속적 리렌더링
  // 전체적은 성능 하락을 가져옴
  // 따라서, 카카오맵의 로딩 시점을 확인하려면 따로 boolean형 변수 사용
  const isKakaoMapLoaded = ref(false);
  const markerList = ref([]); // 생성된 마커 저장
  let clusterer = undefined;

  const setKakaoLoad = () => {
    isKakaoMapLoaded.value = true;
  };
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
      map: window.kakaoMap,
      position: new kakao.maps.LatLng(lat, lng),
    });

    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    infowindow.setContent(
      '<div style="padding:5px;font-size:12px;">' + name + "</div>",
    );

    kakao.maps.event.addListener(marker, "mouseover", function () {
      infowindow.open(window.kakaoMap, marker);
    });

    kakao.maps.event.addListener(marker, "mouseout", function () {
      infowindow.close();
    });
    markerList.value.push(marker);
    return marker;
  };

  // 카카오맵 객체가 등록될 경우 클러스터 생성
  const drawClusterer = () => {
    if (markerList.value.length === 0) {
      return;
    }
    if (clusterer !== null && clusterer !== undefined) {
      clusterer.clear();
    } else {
      clusterer = new kakao.maps.MarkerClusterer({
        map: window.kakaoMap, // 마커들을 클러스터로 관리하고 표시할 지도 객체
        averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
        minLevel: 5, // 클러스터 할 최소 지도 레벨
      });
    }
    console.log(markerList.value);
    clusterer.addMarkers(markerList.value);
    console.log(clusterer);
  };
  return {
    isKakaoMapLoaded,
    setKakaoLoad,
    resetMarker,
    drawMarker,
    drawClusterer,
  };
});
