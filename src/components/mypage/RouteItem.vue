<script setup>
import RouteTimeline from "@/components/mypage/RouteTimeline.vue";
import LastTripDetail from "@/components/mypage/LastTripDetail.vue";
import { ref, onMounted } from "vue";
import { localAxios } from "@/util/axios_interceptor";
import { useTokenStore } from "@/stores/tokenStore";

const local = localAxios();
const tokenStore = useTokenStore();
const REST_TRAVELHISTORY_API = `/travelHistory`;

const props = defineProps({
  id: Number, //여행 아이디
  isLast: Boolean,
});

const tripTitle = ref(""); //여행 이름
const startDay = ref("0000-00-00");
const endDay = ref("0000-00-00");

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
      console.log(plans.value);
      startDay.value = plans.value[0].visitDate.slice(0, 10);
      endDay.value = plans.value[plans.value.length - 1].visitDate.slice(0, 10);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getTripName = () => {
  local
    .get(`${REST_TRAVELHISTORY_API}/title`, {
      params: {
        travelId: props.id,
      },
    })
    .then((res) => {
      console.log(res);
      tripTitle.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

onMounted(() => {
  getSpotList();
  getTripName();
  console.log(props.isLast);
});

const dialog = ref(false);
const closeDialog = () => {
  dialog.value = false;
};

//수정페이지로 이동
const moveTo = () => {
  //plan.id(여행 계획 아이디 이용)
  if (!props.isLast) console.log(props.id + "로 이동");
  else dialog.value = true;
};

const emit = defineEmits(["clickBtn"]);

const clickBtn = (id, tripTitle, isLast) => {
  //선택된 날짜 전송
  emit("clickBtn", id, tripTitle, isLast);
};
</script>

<template>
  <div class="py-3 px-2">
    <v-card class="route-item mr-5" position="relative" elevation="5">
      <v-card-title class="text-center font-weight-black mt-3">
        {{ tripTitle }}
      </v-card-title>

      <!-- 여행 태그 -->
      <!-- 시대 출력 -->
      <v-card-item class="d-flex justify-end pt-0">
        <!-- <v-chip class="text-body-2 ml-1" v-for="chip in plan.chips"> -->
        <!-- {{ chip }} -->
        <!-- </v-chip> -->
      </v-card-item>

      <!-- 여행 기간 -->
      <v-card-text class="text-center">
        {{ startDay }} ~ {{ endDay }}
      </v-card-text>

      <!-- 타임라인 -->
      <v-card-item class="pa-0 position-relative">
        <RouteTimeline
          class="mt-5 mb-10 timeline position-absolute"
          :plans="plans"
        />
      </v-card-item>

      <!-- 버튼 -->
      <v-card-item class="pa-0 position-absolute bottom-0" style="width: 100%">
        <v-btn
          block
          color="blue-grey-lighten-2"
          rounded="0"
          height="50"
          @click="clickBtn(id, tripTitle, isLast)"
        >
          자세히보기
        </v-btn>
      </v-card-item>
    </v-card>
  </div>
</template>

<style scoped>
.route-item {
  width: 270px;
  height: 500px;
}

.timeline {
  left: 15%;
}
</style>
