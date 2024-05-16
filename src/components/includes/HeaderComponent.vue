<script setup>
import { RouterLink, useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import { onMounted } from "vue";
const router = useRouter();
const userStore = useUserStore();

const logout = () => {
  userStore.userLogout();
};

const goToMainPage = () => {
  router.push({ name: "index" });
};

// onMounted(() => {
//   console.log(userStore.isLogin);
// });
</script>

<!-- 로고,  -->
<template>
  <div id="header" class="position-sticky top-0">
    <v-container class="pa-0">
      <div class="d-flex justify-space-between align-end pt-5 pb-2 bg-white">
        <div class="pl-4 pb-2" @click="goToMainPage"><h3>로고</h3></div>
        <div>
          <!-- 로그인 했을 때 -->
          <template v-if="!userStore.isLogin">
            <RouterLink :to="{ name: 'login' }"
              ><v-btn variant="plain">로그인</v-btn></RouterLink
            >
          </template>

          <!-- 로그인 안 되어 있을 때 -->
          <template v-else>
            <v-btn variant="plain" @click="logout">로그아웃</v-btn>
            <RouterLink :to="{ name: 'mypage' }">
              <v-btn variant="plain">마이페이지</v-btn>
            </RouterLink>
          </template>

          <v-btn variant="plain" icon="mdi-menu"></v-btn>
        </div>
      </div>
      <div id="header-line"></div>
    </v-container>
  </div>
</template>

<style scoped>
#header-line {
  height: 3px;
  background-color: rgb(150, 182, 167);
}

#header {
  z-index: 1;
}

a {
  text-decoration: none;
  color: #000;
}
</style>
