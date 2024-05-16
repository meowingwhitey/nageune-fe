<script setup>
import { ref } from "vue";

// DB에서 가져오기
const userInfo = ref({
  userId: "abc",
  password: "",
  userEmail: "abc@ssafy.com",
  userNickname: "닉네임",
  userName: "이름",
  joinDate: "2024-05-23",
});

const pwdCheck = ref("");

const updateProfile = () => {
  // DB 수정
  console.log(userInfo.value);
};

const changeProfileImg = () => {
  console.log("프로필 이미지 변경하기");
};

const visible = ref(true);
</script>

<template>
  <!-- 회원정보 조회 -->
  <div>
    <v-container class="d-flex flex-column">
      <v-row>
        <v-col cols="12" md="10" lg="8" class="mx-auto">
          <!-- 수정하기 버튼 -->
          <v-row justify="center" class="mt-1 mb-5">
            <div class="position-relative" @click="changeProfileImg">
              <p
                class="position-absolute font-weight-bold"
                style="
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  color: white;
                  z-index: 1;
                "
              >
                변경하기
              </p>
              <div
                class="position-absolute rounded-lg"
                style="
                  width: 150px;
                  height: 150px;
                  background-color: rgba(0, 0, 0, 0.5);
                "
              ></div>
              <img
                src="@/assets/profile.png"
                width="150px"
                height="150px"
                class="rounded-lg"
              />
              <div></div>
            </div>
          </v-row>

          <v-text-field
            label="닉네임"
            v-model="userInfo.userNickname"
            variant="outlined"
            density="comfortable"
            prepend-icon="mdi-clipboard-account"
          ></v-text-field>

          <v-text-field
            label="이름"
            v-model="userInfo.Name"
            variant="outlined"
            density="comfortable"
            prepend-icon="mdi-account"
          ></v-text-field>
          <v-text-field
            label="이메일"
            v-model="userInfo.userEmail"
            variant="outlined"
            disabled
            density="comfortable"
            prepend-icon="mdi-email-outline"
          ></v-text-field>

          <v-text-field
            label="새로운 비밀번호 설정"
            v-model="userInfo.password"
            variant="outlined"
            density="comfortable"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="!visible ? 'text' : 'password'"
            prepend-icon="mdi-lock-outline"
            rounded="0"
            @click:append-inner="visible = !visible"
          ></v-text-field>

          <v-text-field
            label="비밀번호 확인"
            v-model="pwdCheck"
            variant="outlined"
            density="comfortable"
            :type="!visible ? 'text' : 'password'"
            prepend-icon="mdi-check"
            rounded="0"
          ></v-text-field>

          <v-text-field
            label="가입한 날짜"
            v-model="userInfo.joinDate"
            variant="outlined"
            density="comfortable"
            prepend-icon="mdi-calendar-blank-outline"
            readonly
            rounded="0"
          ></v-text-field>

          <v-btn
            variant="outlined"
            color="rgb(120, 120, 120)"
            @click="updateProfile"
            >저장하기</v-btn
          >
        </v-col>
      </v-row>

      <v-btn variant="flat" block class="py-6 mt-5" color="rgb(240, 240, 240)"
        >탈퇴하기</v-btn
      >
    </v-container>
  </div>
</template>

<style scoped></style>
