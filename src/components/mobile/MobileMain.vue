<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <!-- 임시용 -->
  <div
    style="height: 40vh"
    class="d-flex flex-column justify-center align-center"
  >
    <div class="text-h4">모바일 메인페이지</div>
    <div>로그인 여부에 따라</div>
    <div>로그인 or 마이페이지 바로가기</div>
  </div>

  <!-- 로그인 여부에 따라 -->
  <div class="d-flex flex-column align-center justify-center ma-4">
    <RouterLink :to="{ name: 'mobileLogin' }">
      <div>로그인하기</div>
    </RouterLink>

    <RouterLink :to="{ name: 'mobileMypage' }">
      <div>마이페이지로 가기</div>
    </RouterLink>
  </div>
</template>

<style scoped>
a {
  text-decoration: none;
  color: #000;
}
</style>
