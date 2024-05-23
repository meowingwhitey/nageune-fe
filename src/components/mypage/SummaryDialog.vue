<script setup>
import { ref, onMounted, watch, computed, onBeforeUpdate } from "vue";
import SummaryRouteList from "@/components/travel/summary/SummaryRouteList.vue";
import { format, addDays, differenceInDays } from "date-fns";
import { localAxios } from "@/util/axios_interceptor";

const local = localAxios();
const REST_TRAVELHISTORY_API = `/travelHistory`;

const emit = defineEmits(["closeDialog"]);
const closeDialog = () => {
  emit("closeDialog");
};

const props = defineProps({
  id: Number, //여행 아이디 불러오기
  tripTitle: String,
});

const startDay = ref("0000-00-00");
const endDay = ref("0000-00-00");

const plans = ref([
  {
    visitDate: "",
    route: [
      {
        name: "", //문화재 이름
        heritageId: 0, //문화재 아이디,
        latitude: 0, //위도
        longitude: 0, //경도
      },
    ],
  },
]);

const heritageCnt = ref(0);
const placeCnt = ref(0);
const routeList = ref([]);

const getSpotList = async () => {
  // local.defaults.headers["Authorization"] = tokenStore.getAccessToken();
  await local
    .get(`${REST_TRAVELHISTORY_API}/route`, {
      params: {
        travelId: props.id,
      },
    })
    .then((res) => {
      plans.value = res.data;

      startDay.value = format(new Date(plans.value[0].visitDate), "yyyy-MM-dd");
      endDay.value = format(
        new Date(plans.value[plans.value.length - 1].visitDate),
        "yyyy-MM-dd",
      );

      plans.value.forEach((day) => {
        let json = JSON.parse(day.route);
        console.log(day);
        routeList.value.push({
          date: format(new Date(day.visitDate), "yyyy-MM-dd"),
          route: json,
        });

        json.forEach((spot) => {
          if (spot.type === "heritage") heritageCnt.value++;
          else placeCnt.value++;
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
// const route = ref("");
watch(plans, (newPlans) => {
  // routeList.value = [];
});

onBeforeUpdate(async () => {
  routeList.value = [];
  heritageCnt.value = 0;
  placeCnt.value = 0;
  await getSpotList();
});
</script>

<template>
  <v-dialog v-model="dialog" max-width="fit-content">
    <v-card class="summary-dialog-card">
      <v-card-title class="text-h6 text-md-h5 text-lg-h4">
        <v-icon icon="mdi-calendar-check-outline" />
        {{ tripTitle }} 확인하기!
      </v-card-title>
      <div>
        <u>
          * 여행 일자는
          <strong>{{ startDay }}</strong>
          ~ <strong>{{ endDay }}</strong
          >이에요.
        </u>
      </div>
      <div>
        <u>
          총
          <strong
            >{{ heritageCnt }}개의 문화재<span class="text-md-h5"
              >🏯</span
            ></strong
          >와
          <strong
            >{{ placeCnt }}개의 경유지<span class="text-md-h5">🚏</span></strong
          >를 방문해요
        </u>
      </div>
      <div style="min-height: 15px"></div>
      <div class="d-flex ga-5 row">
        <SummaryRouteList
          v-for="(route, index) in routeList"
          :routeList="route"
          :day="index"
        />
      </div>
      <div style="min-height: 20px"></div>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.summary-dialog-card {
  min-width: 730px;
  width: fit-content;
  padding: 30px;
  display: flex;
  align-items: center;
}
</style>
