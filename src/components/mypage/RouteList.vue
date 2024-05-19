<script setup>
import RouteItem from "@/components/mypage/RouteItem.vue";
import { usePlanStore } from "@/stores/planStore";

const planStore = usePlanStore();

//앞으로의 여행리스트 get
</script>

<template>
  <div class="mt-3 d-flex align-center overflow-auto">
    <!-- 검색? -->
    <RouteItem v-for="plan in planStore.planList" :key="plan.id" :plan="plan" />
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
