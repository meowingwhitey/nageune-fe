<script setup>
import SpotItem from "@/components/mobile/spot/SpotItem.vue";
import TimelineDot from "@/components/mobile/spot/TimelineDot.vue";
import { onMounted, ref, onBeforeUpdate } from "vue";
defineProps({
  plan: Array,
});

const planList = ref();
</script>

<template>
  <!-- 스크롤 필요 -->
  <div>
    <template v-for="(spot, index) in plan" :key="index">
      <template v-if="spot.type === 'heritage'">
        <div class="d-flex">
          <TimelineDot :spotcnt="index + 1" />
          <SpotItem :spot="spot" />
        </div>
      </template>
    </template>
  </div>
</template>

<style scoped></style>
