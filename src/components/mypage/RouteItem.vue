<script setup>
import RouteTimeline from "@/components/mypage/RouteTimeline.vue";
</script>

<template>
  <div class="py-3 px-2">
    <v-card class="route-item mr-5" position="relative" elevation="5">
      <v-card-title class="text-center font-weight-black mt-3">
        신라 여행
      </v-card-title>

      <!-- 여행 태그 -->
      <v-card-item class="d-flex justify-end pt-0">
        <v-chip class="text-body-2 mr-1">신라</v-chip>
        <v-chip class="text-body-2">광주</v-chip>
      </v-card-item>

      <!-- 여행 기간 -->
      <v-card-text class="text-center">2024.04.25~2024.04.27</v-card-text>

      <!-- 타임라인 -->
      <v-card-item class="pa-0">
        <RouteTimeline class="mt-5 mb-10" />
      </v-card-item>

      <!-- 버튼 -->
      <v-card-item class="pa-0 position-absolute bottom-0" style="width: 100%">
        <v-btn block color="blue-grey-lighten-2" rounded="0" height="50">
          자세히보기
        </v-btn>
      </v-card-item>
    </v-card>
  </div>
</template>

<style scoped>
.route-item {
  width: 270px;
  height: 500px;
}
</style>
