import { ref } from "vue";
import { defineStore } from "pinia";

export const useRouteStore = defineStore("routeStore", () => {
  const routeList = ref([
    {
      date: "2024-04-01",
      route: [
        { name: "광화문", address: "서울 어쩌구 저쩌구", id: 1 },
        { name: "1호선 종로3가역", address: "서울 어쩌구 저쩌구", id: 2 },
        { name: "경복궁", address: "서울 어쩌구 저쩌구", id: 3 },
        { name: "서울역역사공원", address: "서울 어쩌구 저쩌구", id: 4 },
      ],
    },
    {
      date: "2024-04-02",
      route: [
        { name: "2호선 역삼역", address: "서울 어쩌구 저쩌구", id: 1 },
        { name: "2호선 강남역", address: "서울 어쩌구 저쩌구", id: 2 },
        { name: "용산 CGV", address: "서울 어쩌구 저쩌구", id: 3 },
        { name: "남산타워", address: "서울 어쩌구 저쩌구", id: 4 },
      ],
    },
    {
      date: "2024-04-03",
      route: [
        { name: "1호선 남영역", address: "서울 어쩌구 저쩌구", id: 1 },
        { name: "1호선 노량진역", address: "서울 어쩌구 저쩌구", id: 2 },
        { name: "노량진 수산시장", address: "서울 어쩌구 저쩌구", id: 3 },
        { name: "한강시민공원", address: "서울 어쩌구 저쩌구", id: 4 },
      ],
    },
    {
      date: "2024-04-04",
      route: [
        { name: "광화문", address: "서울 어쩌구 저쩌구", id: 1 },
        { name: "1호선 종로3가역", address: "서울 어쩌구 저쩌구", id: 2 },
        { name: "경복궁", address: "서울 어쩌구 저쩌구", id: 3 },
        { name: "서울역역사공원", address: "서울 어쩌구 저쩌구", id: 4 },
      ],
    },
  ]);
  return { routeList };
});
