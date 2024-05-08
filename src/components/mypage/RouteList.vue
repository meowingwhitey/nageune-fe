<script setup>
import RouteItem from "@/components/mypage/RouteItem.vue";
</script>

<template>
  <div class="mt-6 d-flex align-center overflow-auto">
    <RouteItem v-for="i in 2" />
    <div id="add-route-box">
      <div class="font-weight-medium text-decoration-underline">
        여행 계획 작성하기
      </div>
    </div>
  </div>
</template>

<style scoped>
#add-route-box {
  width: 270px;
  height: 520px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
