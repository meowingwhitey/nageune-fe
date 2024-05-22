<script setup>
import RouteItem from "@/components/mypage/RouteItem.vue";
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
      // console.log(res);
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
  <div class="mt-3 d-flex align-center overflow-auto">
    <!-- 검색? -->
    <RouteItem
      v-for="id in plansId"
      :key="id"
      :id="id"
      :isLast="false"
      @click-btn="clickBtn"
    />
    <div
      id="add-route-box"
      class="d-flex justify-center align-center text-center flex-column"
    >
      <v-btn icon="mdi-plus" class="mb-3"></v-btn>
      <div class="font-weight-medium text-decoration-underline">
        여행 계획 작성하기
      </div>
    </div>
  </div>
</template>

<style scoped>
#add-route-box {
  min-width: 270px;
  min-height: 520px;
}
</style>
