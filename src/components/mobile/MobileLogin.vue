<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();

const visible = ref(false);
const email = ref("");
const password = ref("");

const login = () => {
  userStore.userLogin(email.value, password.value);
};
</script>

<template>
  <div
    id="mobile-login"
    class="d-flex flex-column justify-center align-center bg-white"
  >
    <div
      class="d-flex flex-column justify-center align-center ma-3"
      style="width: 100%; min-height: 20vh"
    >
      <img src="@/assets/logo.png" width="100px" height="100px" />
      <div class="mt-3 font-weight-bold text-h5">로그인</div>
    </div>

    <div class="d-flex flex-column" id="login-box">
      <div class="text-subtitle-1 text-medium-emphasis">이메일</div>

      <v-card variant="text">
        <v-text-field
          density="compact"
          placeholder="이메일"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          v-model="email"
        ></v-text-field>

        <div
          class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
        >
          비밀번호

          <!-- <a
            class="text-caption text-decoration-none text-green-darken-4"
            rel="noopener noreferrer"
            target="_blank"
          >
            비밀번호 찾기</a
          > -->
        </div>

        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="비밀번호를 입력해주세요."
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
          v-model="password"
        ></v-text-field>

        <v-btn
          class="mb-8"
          color="teal-darken-1"
          size="large"
          block
          @click="login"
        >
          로그인
        </v-btn>

        <v-card-text class="text-center">
          <a
            class="text-grey-darken-2 text-decoration-none"
            rel="noopener noreferrer"
            target="_blank"
          >
            회원가입 <v-icon icon="mdi-chevron-right"></v-icon>
          </a>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<style scoped>
#login-box {
  width: 90vw;
  min-width: 320px;
}

#mobile-login {
  margin-top: 10vh;
}
</style>
