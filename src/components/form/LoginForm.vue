<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();

const router = useRouter();
const visible = ref(true);

const email = ref("");
const password = ref("");

const goToSignUp = () => {
  router.push({ name: "signup" });
};

const login = () => {
  console.log(email.value, password.value);
  userStore.userLogin(email.value, password.value);
};
</script>

<template>
  <v-container class="d-flex justify-center">
    <div
      class="d-flex flex-column justify-center align-center mt-10 pa-10"
      id="login-outer-box"
    >
      <div
        class="d-flex flex-column justify-center align-center"
        style="width: 100%; min-height: 20vh"
      >
        <img src="@/assets/heritage_icon.png" width="100px" height="100px" />
        <div class="mt-3 font-weight-bold text-h5">로그인</div>
      </div>

      <div class="d-flex flex-column" id="login-box">
        <div class="text-subtitle-1 text-medium-emphasis">이메일</div>

        <v-card variant="text" style="border-radius: 0">
          <v-text-field
            density="compact"
            placeholder="이메일"
            prepend-inner-icon="mdi-email-outline"
            variant="outlined"
            v-model="email"
            z-index="1000"
          ></v-text-field>

          <div
            class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
          >
            비밀번호

            <a
              class="text-caption text-decoration-none text-green-darken-4"
              rel="noopener noreferrer"
              target="_blank"
            >
              비밀번호 찾기</a
            >
          </div>

          <v-text-field
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="!visible ? 'text' : 'password'"
            density="compact"
            placeholder="비밀번호를 입력해주세요."
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            v-model="password"
            @click:append-inner="visible = !visible"
          ></v-text-field>

          <v-btn
            class="mb-8"
            color="green-darken-4"
            size="large"
            block
            @click="login"
          >
            로그인
          </v-btn>

          <v-card-text class="text-center" @click="goToSignUp">
            <a class="text-grey-darken-2 text-decoration-none">
              회원가입 <v-icon icon="mdi-chevron-right"></v-icon>
            </a>
          </v-card-text>
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<style scoped>
#login-box {
  min-width: 400px;
}

#login-outer-box {
  width: fit-content;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(50, 50, 50, 0.2);
}
</style>
