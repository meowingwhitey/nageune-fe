<script setup>
import { RouterLink, useRouter } from "vue-router";
import { ref } from "vue";
import { useUserStore } from "@/stores/userStore";

const router = useRouter();
const userStore = useUserStore();

const drawer = ref(false);

const goMain = () => {
  router.push({ name: "mobileMain" });
};

const goMypage = () => {
  router.push({ name: "mobileMypage" });
};
</script>

<template>
  <v-layout>
    <v-app-bar
      class="position-sticky top-0"
      color="rgb(255, 255, 255)"
      :elevation="1"
    >
      <v-app-bar-title>
        <!-- <img src="@/assets/logo.png" width="30px" /> -->
        <div class="pa-3 d-flex row align-center" @click="goMain">
          <img src="/src/assets/logo.png" style="width: 40px; height: 40px" />
          &nbsp;나그네
        </div>
      </v-app-bar-title>
      <template v-if="userStore.isLogin">
        <v-app-bar-nav-icon
          variant="text"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
      </template>
    </v-app-bar>

    <!-- 로그인 했을시에만 활성화 -->
    <template v-if="userStore.isLogin">
      <v-navigation-drawer v-model="drawer" location="right" temporary>
        <!-- 마이페이지, 로그아웃, 일정 리스트보기 (+지난 일정?) -->
        <div id="mypage-box" class="ma-5" @click="goMypage">
          <v-avatar color="surface-variant"></v-avatar>
          <div class="ml-3">
            <div class="text-decoration-none">
              <span class="font-weight-bold">닉네임</span> 님
            </div>
            <div class="text-decoration-none">마이페이지</div>
          </div>
        </div>

        <!-- 게시판? -->

        <!-- 로그아웃 -->
        <v-btn
          class="position-fixed bottom-0 right-0"
          block
          variant="flat"
          size="large"
          @click="userStore.userLogout()"
          >로그아웃</v-btn
        >
      </v-navigation-drawer>
    </template>
  </v-layout>
</template>

<style scoped>
#mypage-box {
  display: flex;
}

a {
  text-decoration: none;
  color: #000;
}
</style>
