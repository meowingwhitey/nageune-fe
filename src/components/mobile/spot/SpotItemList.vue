<script setup>
import SpotItem from "@/components/mobile/spot/SpotItem.vue";
import TimelineDot from "@/components/mobile/spot/TimelineDot.vue";

const props = defineProps({
  plan: Object,
});

console.log(props.plan);
</script>

<template>
  <!-- 스크롤 필요 -->
  <div>
    <template v-for="tripDay in plan.route" :key="tripDay.date">
      <template v-for="spot in tripDay.spots" :key="spot.id">
        <div class="d-flex">
          <!-- 여행 계획 표시(순서 등) -->
          <TimelineDot :spotcnt="spot.id" />
          <SpotItem :spot="spot" />
        </div>
      </template>
    </template>
  </div>
</template>

<style scoped></style>
