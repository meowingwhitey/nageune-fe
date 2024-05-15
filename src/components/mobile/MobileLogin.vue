<script setup>
import { ref } from "vue";

const visible = ref(false);
</script>

<template>
  <div class="d-flex flex-column justify-center align-center">
    <div
      class="d-flex flex-column justify-center align-center ma-3"
      style="width: 100%; min-height: 20vh"
    >
      <img src="@/assets/heritage_icon.png" width="100px" height="100px" />
      <div class="mt-3 font-weight-bold text-h5">로그인</div>
    </div>

    <div class="d-flex flex-column" id="login-box">
      <div class="text-subtitle-1 text-medium-emphasis">아이디</div>

      <v-card variant="text">
        <v-text-field
          density="compact"
          placeholder="아이디"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
        ></v-text-field>

        <div
          class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
        >
          비밀번호

          <a
            class="text-caption text-decoration-none text-green-darken-4"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
          >
            비밀번호 찾기</a
          >
        </div>

        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="비밀번호를 입력해주세요."
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <v-btn class="mb-8" color="green-darken-4" size="large" block>
          로그인
        </v-btn>

        <v-card-text class="text-center">
          <a
            class="text-grey-darken-2 text-decoration-none"
            href="#"
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
</style>
