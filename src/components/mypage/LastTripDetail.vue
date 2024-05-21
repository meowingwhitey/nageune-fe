<script setup>
import TripRecord from "@/components/mypage/TripRecord.vue";
import { ref, onMounted, onBeforeUpdate } from "vue";
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

onBeforeUpdate(() => {
  getSpotList();
});
</script>

<template>
  <v-dialog max-width="1200">
    <v-card>
      <v-card-title class="text-center text-h6 font-weight-bold mt-3">
        {{ tripTitle }}
      </v-card-title>
      <v-card-subtitle>
        {{ startDay }}에서 {{ endDay }}까지의 기록
      </v-card-subtitle>
      <v-card-item>
        <TripRecord
          v-for="(plan, index) in plans"
          :key="index"
          :index="index"
          :plan="plan.route"
          :travelId="id"
        />
      </v-card-item>
      <template v-slot:actions>
        <button @click="closeDialog">닫기</button>
      </template>
    </v-card>
    <div class="btn-box">
      <v-btn v-for="i in plans.length" variant="flat" rounded="0"
        >{{ i }}일차</v-btn
      >
    </div>
  </v-dialog>
</template>

<style scoped>
.btn-box {
  position: fixed;
  z-index: 0;
  top: 50%;
  left: 2%;
  transform: translateY(-50%);

  display: flex;
  flex-direction: column;
}
</style>
