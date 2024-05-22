<script setup>
import { RouterLink } from "vue-router";
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();
</script>

<template>
  <!-- 임시용 -->
  <div
    style="height: 40vh"
    class="d-flex flex-column justify-center align-center"
  >
    <div class="text-h4">모바일 메인페이지</div>
  </div>

  <!-- 로그인 여부에 따라 -->
  <div class="d-flex flex-column align-center justify-center ma-4">
    <template v-if="!userStore.isLogin">
      <RouterLink :to="{ name: 'mobileLogin' }">
        <div>로그인하기</div>
      </RouterLink>
    </template>
    <template v-else>
      <RouterLink :to="{ name: 'mobileMypage' }">
        <div>마이페이지로 가기</div>
      </RouterLink>
    </template>
  </div>
</template>

<style scoped>
a {
  text-decoration: none;
  color: #000;
}
</style>
