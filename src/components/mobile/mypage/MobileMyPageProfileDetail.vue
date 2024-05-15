<script setup>
import { ref } from "vue";

// DB에서 가져오기
const userInfo = ref({
  userId: "abc",
  password: "abc",
  userEmail: "abc@ssafy.com",
  userNickname: "닉네임",
  createdDate: "2024-05-23",
});

const pwdCheck = ref("");

const updateProfile = () => {
  // DB 수정
  console.log(profile.value);
};

const changeProfileImg = () => {
  console.log("프로필 이미지 변경하기");
};
</script>

<template>
  <!-- 회원정보 조회 -->
  <div>
    <v-container class="d-flex flex-column">
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
      <form @submit.prevent="updateProfile" class="d-flex flex-column mb-5">
        <v-text-field
          label="닉네임"
          v-model="userInfo.userNickname"
          variant="outlined"
          density="comfortable"
        ></v-text-field>

        <v-text-field
          label="이메일"
          v-model="userInfo.userEmail"
          variant="outlined"
          density="comfortable"
          disabled
        ></v-text-field>

        <v-text-field
          label="비밀번호"
          v-model="userInfo.userPassword"
          variant="outlined"
          density="comfortable"
        ></v-text-field>

        <v-text-field
          label="비밀번호 확인"
          v-model="pwdCheck"
          variant="outlined"
          density="comfortable"
        ></v-text-field>

        <v-text-field
          label="가입한 날짜"
          v-model="userInfo.createdDate"
          variant="outlined"
          density="comfortable"
          disabled
        ></v-text-field>
        <v-btn
          type="submit"
          class="ml-auto"
          variant="outlined"
          color="rgb(120, 120, 120)"
          >저장하기</v-btn
        >
      </form>

      <v-btn variant="flat" block class="py-6 mt-5" color="rgb(240, 240, 240)"
        >탈퇴하기</v-btn
      >
    </v-container>
  </div>
</template>

<style scoped></style>
