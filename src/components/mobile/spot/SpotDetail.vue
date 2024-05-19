<script setup>
import SpotItemList from "@/components/mobile/spot/SpotItemList.vue";
import DateList from "@/components/mobile/spot/DateList.vue";
import MapCurrentLocation from "@/components/mobile/spot/MapCurrentLocation.vue";
import { usePlanStore } from "@/stores/planStore";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";

const route = useRoute();
const planStore = usePlanStore();

const tripId = ref(route.params.id);

//해당 아이디를 가진 여행 계획을 서버로 요청하고 store에 저장
onMounted(() => {
  //요청
});
</script>

<template>
  <div>
    <div class="mx-5 mt-5 mb-1 d-flex justify-center align-center">
      <div class="text-h6 font-weight-bold">{{ planStore.plan.title }}</div>
      <div class="ml-auto">
        {{ planStore.plan.route[0].date }} ~
        {{ planStore.plan.route[planStore.plan.route.length - 1].date }}
      </div>
    </div>
    <v-divider :thickness="10" color="rgb(220, 220, 220)"></v-divider>
    <!-- 지도에 선택한 날짜의 방문해야할 여행지 마커도 같이 표시 -->
    <MapCurrentLocation class="my-3" />
    <v-divider :thickness="10" color="rgb(220, 220, 220)"></v-divider>

    <!-- n일차 표시 -->
    <!-- <DateList class="mb-2" /> -->

    <!-- 아이템박스 -->
    <SpotItemList class="mt-4" :plan="planStore.plan" />
    <!-- 임시 박스 -->
    <div style="height: 80px"></div>
  </div>
</template>

<style scoped></style>
