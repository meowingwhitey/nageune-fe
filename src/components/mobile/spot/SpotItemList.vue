<script setup>
import SpotItem from "@/components/mobile/spot/SpotItem.vue";
import TimelineDot from "@/components/mobile/spot/TimelineDot.vue";
</script>

<template>
  <!-- 스크롤 필요 -->
  <div>
    <template v-for="i in 3">
      <div class="d-flex">
        <!-- 여행 계획 표시(순서 등) -->
        <TimelineDot :spotcnt="i" />
        <SpotItem />
      </div>
    </template>
  </div>
</template>

<style scoped></style>
