import { ref, watch } from "vue";
import { defineStore } from "pinia";
/**
 * 여행 생성 관련 스토어
 */
export const useTravelStore = defineStore("travelStore", () => {
  const startDate = ref(undefined);
  const endDate = ref(undefined);
  const routeList = ref([
    {
      routeId: 123123,
      date: "2024-04-01",
      route: [
        {
          type: "heritage",
          heritageId: 123123,
          name: "광화문",
          address: "서울 어쩌구 저쩌구",
          lat: 37.575937429308084,
          lng: 126.97684970818823,
        },
        {
          type: "place",
          placeId: 123,
          name: "1호선 종로3가역",
          address: "서울 어쩌구 저쩌구",
          lat: 37.57038480636159,
          lng: 126.99217815936706,
        },
        {
          type: "place",
          placeId: 13453425,
          name: "경복궁",
          address: "서울 어쩌구 저쩌구",
          lat: 37.57570771990471,
          lng: 126.97707618732422,
        },
        {
          type: "place",
          placeId: 5434325,
          name: "서울역역사공원",
          address: "서울 어쩌구 저쩌구",
          lat: 37.55601087622007,
          lng: 126.97210255723115,
        },
      ],
    },
    {
      routeId: 123123,
      date: "2024-04-01",
      route: [
        {
          type: "heritage",
          heritageId: 123123,
          name: "광화문",
          address: "서울 어쩌구 저쩌구",
          lat: 37.575937429308084,
          lng: 126.97684970818823,
        },
        {
          type: "place",
          placeId: 123,
          name: "1호선 종로3가역",
          address: "서울 어쩌구 저쩌구",
          lat: 37.57038480636159,
          lng: 126.99217815936706,
        },
        {
          type: "place",
          placeId: 13453425,
          name: "경복궁",
          address: "서울 어쩌구 저쩌구",
          lat: 37.57570771990471,
          lng: 126.97707618732422,
        },
        {
          type: "place",
          placeId: 5434325,
          name: "서울역역사공원",
          address: "서울 어쩌구 저쩌구",
          lat: 37.55601087622007,
          lng: 126.97210255723115,
        },
      ],
    },
    {
      routeId: 123123,
      date: "2024-04-01",
      route: [
        {
          type: "heritage",
          heritageId: 123123,
          name: "광화문",
          address: "서울 어쩌구 저쩌구",
          lat: 37.575937429308084,
          lng: 126.97684970818823,
        },
        {
          type: "place",
          placeId: 123,
          name: "1호선 종로3가역",
          address: "서울 어쩌구 저쩌구",
          lat: 37.57038480636159,
          lng: 126.99217815936706,
        },
        {
          type: "place",
          placeId: 13453425,
          name: "경복궁",
          address: "서울 어쩌구 저쩌구",
          lat: 37.57570771990471,
          lng: 126.97707618732422,
        },
        {
          type: "place",
          placeId: 5434325,
          name: "서울역역사공원",
          address: "서울 어쩌구 저쩌구",
          lat: 37.55601087622007,
          lng: 126.97210255723115,
        },
      ],
    },
  ]);

  /**
   * 현재 여행 정보를 서버에 저장하기 위한 json 형태로 변환 후 반환
   */
  const getTravelInfo = () => {};
  return { startDate, endDate, routeList };
});
