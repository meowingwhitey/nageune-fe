import { ref, watch } from "vue";
import { defineStore } from "pinia";

export const usePlaceSearchStore = defineStore("placeSearch", () => {
  /**
   * [카카오맵 카테고리 코드 프리셋]
   * https://developers.kakao.com/docs/latest/ko/local/dev-guide#search-by-keyword-request-query-category-group-code
   */
  const categoryItemList = {
    codes: [
      "MT1",
      "CS2",
      "PS3",
      "SC4",
      "AC5",
      "PK6",
      "OL7",
      "SW8",
      "BK9",
      "CT1",
      "AG2",
      "PO3",
      "AT4",
      "AD5",
      "FD6",
      "CE7",
      "HP8",
      "PM9",
    ],
    names: [
      "대형마트",
      "편의점",
      "어린이집, 유치원",
      "학교",
      "학원",

      "주차장",
      "주유소, 충전소",
      "지하철역",
      "은행",
      "문화시설",

      "중개업소",
      "공공기관",
      "관광명소",
      "숙박",
      "음식점",

      "카페",
      "병원",
      "약국",
    ],
  };

  // 검색 결과에 해당 카테고리가 존재하는지
  const categoryExistList = ref([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  // 검색된 결과에서 해당 카테고리를 제외할지
  const categoryCheckList = ref([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  /**
   * 검색 기능
   */
  const kakaoMap = ref({});
  const searchType = ref("place");
  const searchKeyword = ref("");

  const items = ref([]);

  const currentPageIdx = ref(1);
  const isEnd = ref(false);
  const currentItemIdx = ref(0);

  watch(searchKeyword, () => {
    isEnd.value = false;
    currentPageIdx.value = 1;
    currentItemIdx.value = 0;
    items.value = [];
    categoryCheckList.value.fill(false);
    categoryExistList.value.fill(false);
    console.log("값 변경!", searchKeyword.value, items.value.length);
  });

  /**
   * https://developers.kakao.com/docs/latest/ko/local/dev-guide#search-by-keyword
   */
  const api = async (pageSize = 15) => {
    if (searchKeyword.value === "" || isEnd.value) {
      return [];
    }
    const url = `http://dapi.kakao.com/v2/local/search/keyword.json?query=${searchKeyword.value}&page=${currentPageIdx.value}&size=${pageSize}`;
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
      const categoryIdx = categoryItemList.codes.indexOf(
        data[i].category_group_code,
      );
      categoryCheckList.value[categoryIdx] = true;
      categoryExistList.value[categoryIdx] = true;
    }
    // 현재 검색 결과가 최대인지 확인용
    isEnd.value = json.meta.is_end;
    currentPageIdx.value = currentPageIdx.value + 1;
    currentItemIdx.value = currentItemIdx.value + data.length;

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    // 이때, 이전 검색 결과를 포함하여 검색 결과가 존재할 때만 변경
    if (currentItemIdx.value > 0) {
      kakaoMap.value.setBounds(bounds);
    }
    return data;
  };

  const load = async ({ done }) => {
    // Perform API call
    const res = await api();
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
      map: kakaoMap.value,
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
        '<div style="padding:5px;font-size:12px;">' +
          place.place_name +
          "</div>",
      );
      infowindow.open(kakaoMap.value, marker);
      place.isInfoWindowOpen = true;
    });
  };
  return {
    categoryCheckList,
    categoryExistList,
    categoryItemList,
    searchKeyword,
    load,
    currentItemIdx,
    kakaoMap,
    items,
    isEnd,
  };
});
