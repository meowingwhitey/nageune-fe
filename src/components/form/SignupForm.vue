<script setup>
import { ref } from "vue";

const userInfo = ref({
  userEmail: "",
  password: "",
  userName: "",
  userNickName: "",
});
const checkPwd = ref("");
const visible = ref(true);

const variant = ref("plain");
const visibleMsg = ref(false);

const singup = () => {
  // 빈칸이 있는 경우
  if (
    userInfo.value.userEmail === "" ||
    userInfo.value.password === "" ||
    userInfo.value.userName === "" ||
    userInfo.value.userNickName === ""
  ) {
    window.alert("입력하신 내용을 확인해주세요.");
  } else if (visibleMsg.value) {
    window.alert("비밀번호를 확인해주세요.");
  } else {
    //회원가입
    console.log(userInfo.value);
  }
};

const checkPwdSame = () => {
  if (userInfo.value.password !== checkPwd.value) {
    visibleMsg.value = true;
  } else {
    visibleMsg.value = false;
  }
};
</script>

<template>
  <v-container class="d-flex justify-center">
    <div
      class="d-flex flex-column justify-center align-center mt-10 pa-10"
      id="login-outer-box"
    >
      <div
        class="d-flex flex-column justify-center align-center mb-8"
        style="width: 100%"
      >
        <div class="font-weight-bold text-h5">회원가입</div>
      </div>

      <div class="d-flex flex-column" id="login-box">
        <v-card variant="text">
          <div class="input-box">
            <v-text-field
              density="compact"
              placeholder="이메일"
              prepend-inner-icon="mdi-email-outline"
              rounded="0"
              v-model="userInfo.userEmail"
              hide-details="auto"
              :variant="variant"
            ></v-text-field>
          </div>
          <div class="input-box">
            <v-text-field
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="!visible ? 'text' : 'password'"
              density="compact"
              placeholder="비밀번호"
              prepend-inner-icon="mdi-lock-outline"
              rounded="0"
              :variant="variant"
              @click:append-inner="visible = !visible"
              v-model="userInfo.password"
              @keyup="checkPwdSame"
            ></v-text-field>

            <v-text-field
              :type="!visible ? 'text' : 'password'"
              density="compact"
              placeholder="비밀번호 확인"
              prepend-inner-icon="mdi-check"
              rounded="0"
              hide-details="auto"
              :variant="variant"
              v-model="checkPwd"
              @keyup="checkPwdSame"
            ></v-text-field>
            <p v-show="visibleMsg" id="warning-pwd">일치하지 않습니다.</p>
          </div>

          <div class="input-box">
            <v-text-field
              type="text"
              density="compact"
              placeholder="이름"
              prepend-inner-icon="mdi-account"
              rounded="0"
              hide-details="auto"
              class="mt-0"
              :variant="variant"
              v-model="userInfo.userName"
            ></v-text-field>
          </div>

          <div class="input-box">
            <v-text-field
              type="text"
              density="compact"
              placeholder="닉네임"
              prepend-inner-icon="mdi-clipboard-account"
              rounded="0"
              hide-details="auto"
              class="mt-0"
              :variant="variant"
              v-model="userInfo.userNickName"
            ></v-text-field>
          </div>

          <div class="input-box">
            <v-file-input
              label="프로필 사진 업로드"
              rounded="0"
              hide-details="auto"
              density="compact"
              class="ml-2"
              :variant="variant"
            ></v-file-input>
          </div>

          <v-btn
            class="mb-8 mt-8"
            color="green-darken-4"
            size="large"
            block
            @click="singup"
          >
            회원가입
          </v-btn>
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

.input-box {
  border: 2px solid rgb(245, 245, 245);
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 15px;
}

#warning-pwd {
  color: red;
  font-size: smaller;
  text-align: end;
}
</style>
