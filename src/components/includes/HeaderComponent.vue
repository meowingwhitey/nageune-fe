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

<template>
  <div id="header" class="position-sticky top-0 bg-white">
    <v-container class="pa-0">
      <div class="d-flex justify-end bg-white">
        <RouterLink :to="{ name: 'manual' }">
          <span class="ml-3 mr-2 header-text">사용방법</span>
        </RouterLink>
      </div>
      <div class="d-flex justify-space-between align-end pb-2 bg-white">
        <div class="pl-4 pb-2 row d-flex align-center" @click="goToMainPage">
          <img src="/src/assets/logo.png" style="width: 40px; height: 40px" />
          &nbsp;
          <h3>나그네</h3>
        </div>
        <div>
          <!-- 로그인 했을 때 -->
          <template v-if="!userStore.isLogin">
            <RouterLink :to="{ name: 'login' }"
              ><v-btn variant="plain">로그인</v-btn></RouterLink
            >
            <RouterLink :to="{ name: 'signup' }"
              ><v-btn variant="plain">회원가입</v-btn></RouterLink
            >
          </template>

          <!-- 로그인 안 되어 있을 때 -->
          <template v-else>
            <RouterLink :to="{ name: 'mypage' }">
              <v-btn variant="plain">마이페이지</v-btn>
            </RouterLink>
            <v-btn variant="plain" @click="logout">로그아웃</v-btn>
          </template>

          <v-btn variant="plain" icon="mdi-menu"></v-btn>
        </div>
      </div>
      <!-- <div id="header-line"></div> -->
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
  border-style: solid;
  border-width: 0 0 2px 0;
  border-color: #009688;
}

a {
  text-decoration: none;
  color: #000;
}

a :hover {
  text-decoration: underline;
}

.header-text {
  font-size: x-small;
  color: #8a8a8a;
}
</style>
