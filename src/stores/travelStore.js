import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { format, differenceInDays, addDays } from "date-fns";

/**
 * [skmeans]
 * https://www.npmjs.com/package/skmeans
 * 여행 경로들을 사전에 클러스터링 하기 위해 사용
 */
import skmeans from "skmeans";
/**
 * 여행 생성 관련 스토어
 */
export const useTravelStore = defineStore("travelStore", () => {
  const startDate = ref(new Date());
  const endDate = ref(addDays(new Date(), 6));
  const getDays = () => {
    return differenceInDays(endDate.value, startDate.value) + 1;
  };
  const routeList = ref([]);

  // 방문할 문화재, 장소 리스트
  // 경로 설정 단계에서 해당 데이터로 routeList 설정
  const heritageList = ref([]);
  const placeList = ref([]);
  let locationList = [];

  // 데이터 중복 입력 방지를 위한 list
  const heritageIdList = ref([]);
  const placeIdList = ref([]);

  /**
   * 클러스터링을 위한 장소 리스트 생성 및 서버 요청
   */
  const setRouteCluster = async () => {
    locationList = [];
    routeList.value = [];
    heritageList.value.forEach((item) => {
      locationList.push({
        id: Number(item.heritageId),
        type: "heritage",
        latitude: Number(item.latitude),
        longitude: Number(item.longitude),
        name: item.title,
        address: `${item.location} ${item.locationSub}`,
        description: `${item.era}(${item.type})`,
      });
    });

    placeList.value.forEach((item) => {
      locationList.push({
        type: "place",
        id: Number(item.id),
        latitude: Number(item.y),
        longitude: Number(item.x),
        name: item.place_name,
        address: item.address_name,
        description: item.category_name.split(" > ").pop(),
      });
    });

    let vectors = new Array();
    for (let i = 0; i < locationList.length; i++) {
      vectors[i] = [locationList[i].latitude, locationList[i].longitude];
    }
    const days = getDays();
    console.log(JSON.stringify(locationList));
    console.log(JSON.stringify(vectors));
    console.log(days);
    const clusterResult = skmeans(vectors, days);
    console.log(skmeans(vectors, days));

    // 일자별 route 객체 생성
    for (let i = 0; i < days; i++) {
      routeList.value.push({
        date: format(addDays(startDate.value, i), "yyyy-MM-dd"),
        route: [],
      });
    }
    for (
      let clusterIdx = 0;
      clusterIdx < clusterResult.idxs.length;
      clusterIdx++
    ) {
      const day = clusterResult.idxs[clusterIdx];
      routeList.value[day].route.push(locationList[clusterIdx]);
    }
  };

  /**
   * 현재 여행 정보를 서버에 저장하기 위한 json 형태로 변환 후 반환
   */
  const getTravelInfo = () => {};

  /**
   * 여행 루트를 일자별로 생성하여 routeList에 저장
   */
  const createRouteList = () => {
    const days = getDays();
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

  /**
   * 멘 첫 설정으로 갈 경우 내부 스토어 설정 초기화 필요
   */
  const initStore = () => {};

  return {
    heritageList,
    placeList,
    heritageIdList,
    placeIdList,
    startDate,
    endDate,
    routeList,
    locationList,
    getTravelInfo,
    createRouteList,
    setRouteCluster,
    initStore,
  };
});
