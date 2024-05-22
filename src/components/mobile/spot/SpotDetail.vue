<script setup>
import SpotItemList from "@/components/mobile/spot/SpotItemList.vue";
import DateList from "@/components/mobile/spot/DateList.vue";
import MapCurrentLocation from "@/components/mobile/spot/MapCurrentLocation.vue";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { localAxios } from "@/util/axios_interceptor";
import { useTokenStore } from "@/stores/tokenStore";
import { compareAsc, format } from "date-fns";

const local = localAxios();
const tokenStore = useTokenStore();
const REST_TRAVELHISTORY_API = `/travelHistory`;
const route = useRoute();
const startDay = ref("0000-00-00");
const endDay = ref("0000-00-00");

//여행 아이디를 이용해서 여행 계획을 불러옴
const tripId = ref(route.params.id);
const tripLen = ref(1);

const plans = ref([
  {
    visitDate: "",
    routes: [
      {
        name: "", //문화재 이름
        heritageId: 0, //문화재 아이디,
        latitude: 0, //위도
        longitude: 0, //경도
      },
    ],
  },
]);
const travelTitle = ref("");

//문화재만 가져옴
const planOfOneDay = ref({
  route: [],
});

const getSpotList = async () => {
  // local.defaults.headers["Authorization"] = tokenStore.getAccessToken();
  await local
    .get(`${REST_TRAVELHISTORY_API}/route`, {
      params: {
        travelId: tripId.value,
      },
    })
    .then((res) => {
      console.log(res);
      plans.value = res.data;
      startDay.value = format(new Date(plans.value[0].visitDate), "yyyy.MM.dd");
      endDay.value = format(
        new Date(plans.value[plans.value.length - 1].visitDate),
        "yyyy.MM.dd",
      );
      tripLen.value = plans.value.length;
    })
    .catch((err) => {
      console.log(err);
    });
};

//여행이름 가져오기
const getTripName = () => {
  local
    .get(`${REST_TRAVELHISTORY_API}/title`, {
      params: {
        travelId: tripId.value,
      },
    })
    .then((res) => {
      console.log(res);
      travelTitle.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const changeDate = (day) => {
  //day번째 날의 방문지 배열
  planOfOneDay.value = plans.value[day - 1].route;
  // console.log(planOfOneDay.value);
  const json = JSON.parse(planOfOneDay.value);
  planOfOneDay.value = json;
  console.log(planOfOneDay.value);
};

onMounted(async () => {
  await getSpotList();
  getTripName();

  changeDate(1);
});
</script>

<template>
  <div>
    <div class="mx-5 mt-3 mb-2 d-flex justify-center align-end">
      <div class="font-weight-bold">
        <p class="text-h5">{{ travelTitle }}</p>
      </div>
      <div class="ml-auto">
        {{ startDay }} ~
        {{ endDay }}
      </div>
    </div>
    <v-divider :thickness="10" color="rgb(220, 220, 220)"></v-divider>
    <!-- 지도에 선택한 날짜의 방문해야할 여행지 마커도 같이 표시 -->
    <MapCurrentLocation class="my-3" />
    <v-divider :thickness="10" color="rgb(220, 220, 220)"></v-divider>

    <!-- n일차 표시 -->
    <DateList class="mb-2" :date-cnt="tripLen" @change-date="changeDate" />

    <!-- 아이템박스 -->
    <SpotItemList class="mt-4" :plan="planOfOneDay" />
    <!-- 임시 박스 -->
    <div style="height: 80px"></div>
  </div>
</template>

<style scoped></style>
