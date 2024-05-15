<script setup>
import SpotItemList from "@/components/mobile/spot/SpotItemList.vue";
import DateList from "@/components/mobile/spot/DateList.vue";
import MapCurrentLocation from "@/components/mobile/spot/MapCurrentLocation.vue";
</script>

<template>
  <div>
    <div class="mx-5 mt-5 mb-1 d-flex justify-center align-center">
      <div class="text-h6 font-weight-bold">여행 이름</div>
      <div class="ml-auto">2024.05.10 ~ 2024.05.20</div>
    </div>
    <v-divider :thickness="10" color="rgb(220, 220, 220)"></v-divider>
    <!-- 지도에 선택한 날짜의 방문해야할 여행지 마커도 같이 표시 -->
    <MapCurrentLocation class="my-3" />
    <v-divider :thickness="10" color="rgb(220, 220, 220)"></v-divider>
    <DateList class="mb-2" />
    <SpotItemList />
    <!-- 임시 박스 -->
    <div style="height: 80px"></div>
  </div>
</template>

<style scoped></style>
