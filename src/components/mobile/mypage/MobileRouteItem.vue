<script setup>
import VChip from "@/components/mobile/spot/VChip.vue";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { localAxios } from "@/util/axios_interceptor";
import { useTokenStore } from "@/stores/tokenStore";

const local = localAxios();
const tokenStore = useTokenStore();
const REST_TRAVELHISTORY_API = `/travelHistory`;

const router = useRouter();

const props = defineProps({
  id: Number,
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
      console.log("데이터가져옴", res);
      plans.value = res.data;
      startDay.value = plans.value[0].visitDate.slice(0, 10);
      endDay.value = plans.value[plans.value.length - 1].visitDate.slice(0, 10);
    })
    .catch((err) => {
      console.log(err);
      ``;
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

const goRouteDetail = () => {
  router.push({ name: "SpotDetail", params: { id: props.id } });
};
</script>

<template>
  <div>
    <v-card
      class="d-flex mx-5 my-5 pt-3 pb-3"
      variant="tonal"
      color="green-darken-4"
      @click="goRouteDetail"
    >
      <div class="mr-auto ml-5">
        <div class="route-title">{{ tripTitle }}</div>
        <div class="route-duration mb-2">
          {{ startDay }} ~
          {{ endDay }}
        </div>
        <!-- <VChip v-for="chip in plan.chips" :text="chip" class="mr-1" /> -->
      </div>
      <button class="ml-auto mr-5 pa-3">상세보기</button>
    </v-card>
  </div>
</template>

<style scoped>
.route-title {
  font-size: larger;
  font-weight: 500;
}

.route-duration {
  font-size: small;
}
</style>
