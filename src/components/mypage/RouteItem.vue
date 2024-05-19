<script setup>
import RouteTimeline from "@/components/mypage/RouteTimeline.vue";
import { onMounted } from "vue";

const props = defineProps({
  plan: Object,
});

onMounted(() => {
  console.log(props.plan);
});

//수정페이지로 이동
const moveToPlanDetail = () => {
  //plan.id(여행 계획 아이디 이용)
  console.log(props.plan.id + "로 이동");
};
</script>

<template>
  <div class="py-3 px-2">
    <v-card class="route-item mr-5" position="relative" elevation="5">
      <v-card-title class="text-center font-weight-black mt-3">
        {{ plan.title }}
      </v-card-title>

      <!-- 여행 태그 -->
      <!-- 시대 출력 -->
      <v-card-item class="d-flex justify-end pt-0">
        <v-chip class="text-body-2 ml-1" v-for="chip in plan.chips">
          {{ chip }}
        </v-chip>
      </v-card-item>

      <!-- 여행 기간 -->
      <v-card-text class="text-center">
        {{ plan.route[0].date }} ~ {{ plan.route[plan.route.length - 1].date }}
      </v-card-text>

      <!-- 타임라인 -->
      <v-card-item class="pa-0">
        <RouteTimeline class="mt-5 mb-10" :route="plan.route" />
      </v-card-item>

      <!-- 버튼 -->
      <v-card-item class="pa-0 position-absolute bottom-0" style="width: 100%">
        <v-btn
          block
          color="blue-grey-lighten-2"
          rounded="0"
          height="50"
          @click="moveToPlanDetail"
        >
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
