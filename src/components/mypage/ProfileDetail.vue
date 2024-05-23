<script setup>
import { onMounted, ref } from "vue";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();

// DB에서 가져오기
const userInfo = ref({
  password: "",
  email: userStore.userInfo.email,
  nickname: userStore.userInfo.nickname,
  name: userStore.userInfo.name,
  createdAt: userStore.userInfo.createdAt,
  img: userStore.userInfo.img,
});

const pwdCheck = ref("");

const updateProfile = () => {
  //비밀번호 변경
  if (
    userInfo.value.password === "" ||
    userInfo.value.password !== pwdCheck.value
  ) {
    window.alert("비밀번호를 확인해주세요.");
  } else {
    // DB 수정
    // console.log(userInfo.value);
    userStore.updateUserInfo(userInfo.value);

    window.alert("수정되었습니다.");
    userInfo.value.password = "";
    pwdCheck.value = "";

    router.go(0);
  }
};

const changeProfileImg = (event) => {
  // console.log("프로필 이미지 변경하기");
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    userInfo.value.img = e.target.result;
    // console.log(userInfo.value.img);
  };
  reader.readAsDataURL(file);
};

const visible = ref(true);

const deleteUser = () => {
  userStore.deleteUser();
};
</script>

<template>
  <!-- 회원정보 조회 -->
  <div>
    <v-container class="d-flex flex-column">
      <v-row>
        <v-col cols="2" class="ml-auto">
          <v-btn variant="flat" block @click="deleteUser">탈퇴하기</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="10" lg="8" class="mx-auto">
          <!-- 수정하기 버튼 -->
          <v-row justify="center" class="mt-1 mb-5">
            <label id="input-file-btn" for="input-file" class="text-center">
              <div class="position-relative">
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
                <!-- 등록된 프로필 이미지가 없는 경우 -->
                <template v-if="userInfo.img === null">
                  <img
                    src="@/assets/profile.png"
                    width="150px"
                    height="150px"
                    class="rounded-lg"
                  />
                </template>
                <!-- 등록된 프로필 이미지가 있는 경우 -->
                <template v-else>
                  <img
                    :src="userInfo.img"
                    width="150px"
                    height="150px"
                    class="rounded-lg"
                  />
                </template>
              </div>
            </label>
            <input
              id="input-file"
              type="file"
              accept="image/*"
              @change="changeProfileImg"
              v-show="false"
            />
          </v-row>

          <v-text-field
            label="닉네임"
            v-model="userInfo.nickname"
            variant="outlined"
            density="comfortable"
            prepend-icon="mdi-clipboard-account"
          ></v-text-field>

          <v-text-field
            label="이름"
            v-model="userInfo.name"
            variant="outlined"
            density="comfortable"
            prepend-icon="mdi-account"
          ></v-text-field>
          <v-text-field
            label="이메일"
            v-model="userInfo.email"
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
            v-model="userInfo.createdAt"
            variant="outlined"
            density="comfortable"
            prepend-icon="mdi-calendar-blank-outline"
            readonly
            rounded="0"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4" class="mx-auto">
          <v-btn
            variant="outlined"
            block
            color="rgb(120, 120, 120)"
            @click="updateProfile"
            >저장하기</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped></style>
