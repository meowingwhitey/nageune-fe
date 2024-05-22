<script setup>
import TripRecord from "@/components/mypage/TripRecord.vue";
import { ref, onMounted, onBeforeUpdate } from "vue";
import { localAxios } from "@/util/axios_interceptor";
import { compareAsc, format } from "date-fns";
import { useGoTo } from "vuetify";

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
      // console.log(res);
      startDay.value = format(
        new Date(plans.value[0].visitDate),
        "yyyy년 MM월 dd일",
      );
      endDay.value = format(
        new Date(plans.value[plans.value.length - 1].visitDate),
        "yyyy년 MM월 dd일",
      );
    })
    .catch((err) => {
      console.log(err);
    });
};

onBeforeUpdate(() => {
  getSpotList();
});

// const goTo = useGoTo();
// const moveIndex = (index) => {
//   console.log(index, "로이동");
//   goTo(`#day${index}`);
// };

const onboarding = ref(0);
const next = () => {
  onboarding.value =
    onboarding.value + 1 > plans.value.length - 1 ? 0 : onboarding.value + 1;
};
const prev = () => {
  onboarding.value =
    onboarding.value - 1 < 0 ? plans.value.length - 1 : onboarding.value - 1;
};
</script>

<template>
  <v-dialog max-width="1200" min-width="500">
    <v-card>
      <v-card-title class="text-center mt-5">
        <div class="travel-title">
          {{ tripTitle }}
        </div>
      </v-card-title>
      <v-card-subtitle class="text-center mb-2">
        {{ startDay }}에서 {{ endDay }}까지의 기록
      </v-card-subtitle>

      <v-divider
        :thickness="20"
        color="rgb(220, 220, 220)"
        class="my-5"
      ></v-divider>
      <v-card-item class="pt-0 mt-0">
        <v-card class="pt-0 mt-0">
          <v-window v-model="onboarding" show-arrows="hover">
            <v-window-item
              v-for="(plan, index) in plans"
              :key="index"
              :value="index + 1"
            >
              <TripRecord :index="index" :plan="plan.route" :travelId="id" />
            </v-window-item>
          </v-window>

          <div class="d-flex justify-center">
            <v-card-actions class="justify-space-between">
              <v-item-group v-model="onboarding" class="text-center" mandatory>
                <v-item
                  v-for="idx in plans.length"
                  :key="idx"
                  v-slot="{ isSelected, toggle }"
                  :value="idx"
                >
                  <v-btn
                    :variant="isSelected ? 'outlined' : 'text'"
                    icon="mdi-record"
                    @click="toggle"
                  ></v-btn>
                </v-item>
              </v-item-group>
            </v-card-actions>
          </div>
        </v-card>
      </v-card-item>
      <v-divider
        :thickness="20"
        color="rgb(220, 220, 220)"
        class="my-5"
      ></v-divider>
      <v-card-item>
        <div id="map">지도 다녀온 곳 마커</div>
      </v-card-item>
      <template v-slot:actions>
        <button @click="closeDialog">닫기</button>
      </template>
    </v-card>
  </v-dialog>
</template>

<style scoped>
#map {
  min-width: 500px;
  width: 80vw;
  height: 300px;
  background-color: aliceblue;
  margin: auto;
}
.btn-box {
  position: fixed;
  z-index: 0;
  top: 50%;
  left: 2%;
  transform: translateY(-50%);

  display: flex;
  flex-direction: column;
}

.travel-title {
  font-size: xx-large;
  font-weight: bolder;
}
</style>
