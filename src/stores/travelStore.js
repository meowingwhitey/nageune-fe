import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { format, differenceInDays, addDays } from "date-fns";
/**
 * 여행 생성 관련 스토어
 */
export const useTravelStore = defineStore("travelStore", () => {
  const startDate = ref(undefined);
  const endDate = ref(undefined);
  const routeList = ref(undefined);

  /**
   * 현재 여행 정보를 서버에 저장하기 위한 json 형태로 변환 후 반환
   */
  const getTravelInfo = () => {};

  /**
   * 여행 루트를 일자별로 생성하여 routeList에 저장
   */
  const createRouteList = () => {
    const days = differenceInDays(endDate.value, startDate.value);
    routeList.value = [];
    for (let dayIdx = 0; dayIdx < days; dayIdx++) {
      const day = addDays(startDate.value, dayIdx);
      console.log(routeList.value);
      routeList.value.push({
        date: format(day, "yyyy-MM-dd"),
        route: [],
      });
    }
  };

  return { startDate, endDate, routeList, getTravelInfo, createRouteList };
});
