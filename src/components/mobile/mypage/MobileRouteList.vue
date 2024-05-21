<script setup>
import MobileRouteItem from "@/components/mobile/mypage/MobileRouteItem.vue";
import { ref, onMounted } from "vue";

import { localAxios } from "@/util/axios_interceptor";
import { useTokenStore } from "@/stores/tokenStore";

const local = localAxios();
const tokenStore = useTokenStore();
const REST_TRAVELHISTORY_API = `/travelHistory`;

const plansId = ref([]);

const getSpotList = async () => {
  await local
    .get(`${REST_TRAVELHISTORY_API}/currentTravelList`)
    .then((res) => {
      plansId.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

onMounted(() => {
  getSpotList();
});

const travelId = ref(0);
const travelTitle = ref("");
const clickBtn = (id) => {
  console.log(id + "로 이동");
};

//앞으로의 여행리스트 get
</script>

<template>
  <MobileRouteItem v-for="id in plansId" :key="id" :id="id" />
  <div class="text-center mt-10">생성 및 수정은 pc버전에서 가능합니다.</div>
</template>

<style scoped></style>
