<script setup>
import { RouterView } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import { useTokenStore } from "./stores/tokenStore";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();
const tokenStore = useTokenStore();
const delay = 1000 * 60 * 30; //30분
const expireTimeOfRefreshToken = 3600000;

//로그인 했을 때만 실행
//30분 주기로 최근 route 변경 시간을 확인하고 refresh token 재발급 여부를 정함
const checkRefreshToken = () => {
  setInterval(() => {
    console.log("refresh token 체크");

    // refresh token 재발급
    if (Date.now() - userStore.lastAccess < expireTimeOfRefreshToken) {
      tokenStore.refreshTokenRegenerate();
    } else {
      //로그아웃
      userStore.userLogout();
      router.push({ name: "index" });
    }
  }, delay);
};
</script>

<template>
  <div id="bg-box">
    <RouterView />
  </div>
</template>

<style scoped>
#bg-box {
  margin: auto;
  width: 100%;
  min-height: 100vh;
  background-image: url("/src/assets/1.PNG");
  background-size: cover;
  background-repeat: no-repeat;
  backdrop-filter: blur(5px);
  background-attachment: fixed;
  background-position: center;
  position: sticky;
  overflow: hidden;
}
</style>
