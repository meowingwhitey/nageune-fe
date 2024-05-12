import { ref, watch } from "vue";
import { defineStore } from "pinia";

export const useTravelStore = defineStore("travelStore", () => {
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
  const kakaoMap = ref(undefined);

  return {
    kakaoMap,
  };
});
