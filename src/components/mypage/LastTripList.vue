<script setup>
import RouteItem from "@/components/mypage/RouteItem.vue";
import { usePlanStore } from "@/stores/planStore";

const planStore = usePlanStore();

//지난 여행 리스트 get
</script>

<template>
  <div>
    <!-- <SearchDate /> -->
    <div class="mt-3 d-flex align-center overflow-auto">
      <!-- 검색? -->
      <RouteItem
        v-for="plan in planStore.planList"
        :key="plan.id"
        :plan="plan"
      />
    </div>
  </div>
</template>

<style scoped>
#add-route-box {
  min-width: 270px;
  min-height: 520px;
}
</style>
