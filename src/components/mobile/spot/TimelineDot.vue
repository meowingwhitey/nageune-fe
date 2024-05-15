<script setup>
//특정 날짜에 방문할 여행지가 몇개인지
defineProps({
  spotcnt: Number,
});
</script>

<template>
  <v-col col="2" class="position-relative">
    <!-- 맨위, 맨 아래는 안 나오게 수정 -->
    <div class="timeline-line line-top"></div>
    <div class="timeline-line line-bottom"></div>
    <div class="rounded-circle position-absolute timeline-dot"></div>
    <div>
      <!-- 날짜, 번호 출력 -->
      <p class="position-absolute timeline-num font-weight-bold">
        {{ spotcnt }}
      </p>
    </div>
  </v-col>
</template>

<style scoped>
.timeline-num {
  top: 30%;
  right: 50%;
  transform: translate(-50%, -50%);
}

.timeline-dot {
  height: 30px;
  width: 30px;
  background-color: #388e3c;
  top: 30%;
  left: 80%;
  transform: translate(-50%, -50%);
  border: 5px solid #fff;
}

.timeline-line {
  height: 50%;
  width: 2px;
  background-color: rgb(157, 157, 157);
  position: absolute;
  left: 80%;
  transform: translate(-50%, 0);
}

.line-top {
  top: 0;
}

.line-bottom {
  bottom: 0;
}
</style>
