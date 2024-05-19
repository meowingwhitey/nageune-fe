import { ref, watch } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
/**
 * 여행 경유지 or 문화재 검색시 사용하는 Store
 */
const REST_USER_API = `http://localhost:8080/api/v1/heritage`;

export const useSearchStore = defineStore("searchStore", () => {
  const eraRangeCodes = ref({ start: 1, end: 60 });

  const locationRangeCoord = ref({
    latStart: 0,
    latEnd: 0,
    lngStart: 0,
    lngEnd: 0,
  });

  const getHeritageListByLocation = async () => {
    const params = {
      latitudeStart: locationRangeCoord.value.latStart,
      latitudeEnd: locationRangeCoord.value.latEnd,
      longitudeStart: locationRangeCoord.value.lngStart,
      longitudeEnd: locationRangeCoord.value.lngEnd,
      startEraCode: eraRangeCodes.value.start,
      endEraCode: eraRangeCodes.value.end,
    };

    const response = axios.get(`${REST_USER_API}/condition`, { params });
    const data = (await response).data;
    console.log(data.results);
    return data.results;
  };

  const markerList = ref([]);

  const resetMarker = () => {
    markerList.value.forEach((marker) => {
      marker.setMap(null);
    });
    markerList.value = [];
  };

  const drawMarker = async () => {
    // 지도의 현재 영역을 얻어옵니다
    const bounds = window.kakaoMap.getBounds();
    // 영역의 남서쪽 좌표를 얻어옵니다
    const swLatLng = bounds.getSouthWest();

    // 영역의 북동쪽 좌표를 얻어옵니다
    const neLatLng = bounds.getNorthEast();

    locationRangeCoord.value.latStart = swLatLng.getLat();
    locationRangeCoord.value.latEnd = neLatLng.getLat();
    locationRangeCoord.value.lngStart = swLatLng.getLng();
    locationRangeCoord.value.lngEnd = neLatLng.getLng();

    const heritageList = await getHeritageListByLocation();

    console.log(heritageList);

    heritageList.forEach((heritage) => {
      // 마커를 생성하고 지도에 표시합니다
      const marker = new kakao.maps.Marker({
        map: window.kakaoMap,
        position: new kakao.maps.LatLng(heritage.latitude, heritage.longitude),
      });
      const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
      infowindow.setContent(
        `<div style="padding:5px;font-size:12px;">${heritage.title}</div>`,
      );
      kakao.maps.event.addListener(marker, "mouseover", function () {
        infowindow.open(window.kakaoMap, marker);
      });
      kakao.maps.event.addListener(marker, "mouseout", function () {
        infowindow.close();
      });
      console.log("marker created!");
      markerList.value.push(marker);
    });
  };
  return {
    eraRangeCodes,
    locationRangeCoord,
    getHeritageListByLocation,
    drawMarker,
    resetMarker,
  };
});
