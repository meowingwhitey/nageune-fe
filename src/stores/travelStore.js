import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { format, differenceInDays, addDays } from "date-fns";
import { localAxios } from "@/util/axios_interceptor";

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
  const axios = localAxios();

  /**
   * 경로 출발지 설정
   */
  const departure = ref(undefined);

  let isClustered = false; // 지금 경로의 클러스터 생성 여부 체크

  // 00:00:00부터 계산하기 위해 아래처럼 출발일 설정
  const startDate = ref(new Date(format(new Date(), "MM/dd/yyyy")));
  const endDate = ref(addDays(new Date(), 6));
  const getDays = () => {
    console.log(endDate.value);
    console.log(startDate.value);
    console.log(differenceInDays(endDate.value, startDate.value) + 1);
    return differenceInDays(endDate.value, startDate.value) + 1;
  };
  const travelTitle = ref("");
  const routeList = ref([]);

  /**
   * 경로 생성 및 최적화 관련 코드
   */
  // 하버사인을 적용한 거리
  const getDistance = ([lat1, lon1], [lat2, lon2]) => {
    const toRadians = (angle) => angle * (Math.PI / 180);
    const R = 6371; // 지구의 반지름 (킬로미터 단위)

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // 거리 반환 (킬로미터 단위)
  };

  const permute = (arr) => {
    let result = [];

    if (arr.length === 0) {
      return [[]];
    }

    for (let i = 0; i < arr.length; i++) {
      let current = arr.slice();
      let next = current.splice(i, 1);
      let perms = permute(current);

      for (let perm of perms) {
        result.push(next.concat(perm));
      }
    }

    return result;
  };

  const generatePermutations = (N) => {
    let numbers = [];
    for (let i = 0; i < N; i++) {
      numbers.push(i);
    }
    return permute(numbers);
  };

  // 방문할 문화재, 장소 리스트
  // 경로 설정 단계에서 해당 데이터로 routeList 설정
  const heritageList = ref([]);
  const placeList = ref([]);
  let locationList = [];

  // 데이터 중복 입력 방지를 위한 list
  const heritageIdList = ref([]);
  const placeIdList = ref([]);

  watch(heritageList, () => {
    isClustered = false;
  });

  watch(placeList, () => {
    isClustered = false;
  });

  /**
   * 경로 생성 클러스터링을 위한 장소 리스트 생성
   */
  const setRouteCluster = async () => {
    // 기존 경유지가 변경되지 않았다면 클러스터 제외
    if (isClustered) {
      return;
    }

    heritageList.value.forEach((item) => {
      locationList.push({
        id: Number(item.heritageId),
        type: "heritage",
        latitude: Number(item.latitude),
        longitude: Number(item.longitude),
        name: item.title,
        address: `${item.location} ${item.locationSub}`,
        description: `${item.era}(${item.type})`,
        imageUrl,
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
        imageUrl: item.imageUrl,
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

    /**
     * 클러스터링 진행
     */
    const clusterResult = skmeans(
      vectors,
      routeList.value.length,
      null,
      null,
      // 각 지점 간 거리를 구하는 공식에는 하버사인 적용
      getDistance,
    );
    console.log(clusterResult);

    /**
     * 클러스터링 된 애들에 대하여 departure 지점을 시점 종점으로 삼아 클러스터간 최단 경로 생성
     */
    let optimizedClusterIdxList = [];
    let minCost = Number.MAX_VALUE;
    const clusterCenterList = clusterResult.centroids;
    const permutations = generatePermutations(clusterResult.k);
    console.log(permutations);
    permutations.forEach((seq) => {
      // 출발/도착점과 첫번째/마지막클러스터 중심의 비용
      const departureCost = getDistance(
        [Number(departure.value.y), Number(departure.value.x)],
        [clusterCenterList[0][0], clusterCenterList[0][1]],
      );
      console.log(
        [Number(departure.value.y), Number(departure.value.x)],
        [clusterCenterList[0][0], clusterCenterList[0][1]],
      );
      const arrivalCost = getDistance(
        [Number(departure.value.y), Number(departure.value.x)],
        [
          clusterCenterList[seq.length - 1][0],
          clusterCenterList[seq.length - 1][1],
        ],
      );
      let cost = departureCost + arrivalCost;
      // 남은 지점들간 비용 계산
      for (let i = 0; i < seq.length - 1; i++) {
        const currentCost = getDistance(
          [clusterCenterList[i][0], clusterCenterList[i][0]],
          [clusterCenterList[i + 1][0], clusterCenterList[i + 1][1]],
        );
        cost = cost + currentCost;
      }
      if (minCost > cost) {
        console.log(`[OPT]: ${minCost}, ${seq}`);
        minCost = cost;
        optimizedClusterIdxList = seq;
      }
    });

    /**
     * 클러스터가 완료된 idxs 배열을 갖고 기존 locationList의 클러스터링 진행 맞도록 삽입
     */
    for (
      let clusterIdx = 0;
      clusterIdx < clusterResult.idxs.length;
      clusterIdx++
    ) {
      const kIdx = clusterResult.idxs[clusterIdx];
      routeList.value[optimizedClusterIdxList[kIdx]].route.push(
        locationList[clusterIdx],
      );
    }

    isClustered = true;
  };

  /**
   * 현재 여행 정보를 서버에 저장하기 위한 json 형태로 변환 후 반환
   */
  const sendTravelInfo = async () => {
    const travelData = {};

    // 제목 설정
    travelData.title = travelTitle.value;
    travelData.routes = routeList.value;

    console.log(travelData);

    await axios.post("/travel/create", travelData);
  };

  /**
   * 여행 루트를 일자별로 생성하여 routeList에 저장
   */
  const createRouteList = () => {
    isClustered = false;
    const days = getDays();
    heritageList.value = [];
    placeList.value = [];
    routeList.value = [];
    for (let dayIdx = 0; dayIdx < days; dayIdx++) {
      const day = addDays(startDate.value, dayIdx);
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
    departure,
    createRouteList,
    setRouteCluster,
    travelTitle,
    initStore,
    sendTravelInfo,
  };
});
