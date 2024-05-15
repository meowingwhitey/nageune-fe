<script setup>
import MobileRouteItem from "@/components/mobile/mypage/MobileRouteItem.vue";
import MobileMyPageProfileDetail from "@/components/mobile/mypage/MobileMyPageProfileDetail.vue";
import { ref } from "vue";

const tab = ref("plans");
</script>

<template>
  <v-card class="d-flex align-end mt-9 mb-6" variant="flat">
    <!-- 프로필 이미지 -->
    <div id="profile-image" class="ml-5 mr-2"></div>
    <div class="ml-2">
      <!-- 닉네임, 이메일, 가입날짜 출력 -->
      <div class="mb-1"><span class="font-weight-bold">닉네임</span>님</div>
      <div class="profile-text">이메일@ssafy.com</div>
      <div class="profile-text mb-1">2024.05.10부터 여행 중</div>
    </div>
  </v-card>
  <v-divider :thickness="10" color="rgb(220, 220, 220)"></v-divider>
  <!-- <div id="m-tabs" class="d-flex justify-space-between px-5 py-3"> -->
  <!-- <button>여행계획</button>
    <button>여행카드</button>
    <button>회원정보</button>
  </div>
  <v-divider :thickness="10" color="rgb(220, 220, 220)"></v-divider> -->

  <v-tabs align-tabs="center" v-model="tab">
    <v-tab value="plans">여행계획</v-tab>
    <v-tab value="cards">여행카드</v-tab>
    <v-tab value="profile">회원정보</v-tab>
  </v-tabs>

  <v-tabs-window v-model="tab">
    <v-tabs-window-item value="plans">
      <!-- 조건 검색 필요? -->
      <!-- 경로 아이디 함께 보내기 -->
      <MobileRouteItem v-for="i in 3" :routeId="i" />
      <div class="text-center mt-10">
        생성 및 수정은 pc버전에서만 가능하다는 메세지
      </div>
    </v-tabs-window-item>
    <v-tabs-window-item value="cards">여행 카드</v-tabs-window-item>
    <v-tabs-window-item value="profile"
      ><MobileMyPageProfileDetail
    /></v-tabs-window-item>
  </v-tabs-window>
</template>

<style scoped>
#profile-image {
  width: 100px;
  height: 100px;
  background-color: #1b5e20;
  border-radius: 10px;
}

#m-tabs {
  min-width: 300px;
}

#m-tabs button {
  width: 28vw;
  height: 70px;
  box-shadow: 0 0 2px rgba(17, 45, 5, 0.5);
  border-radius: 8px;
  background-color: #fff;
  font-size: smaller;
}

.profile-text {
  font-size: smaller;
}
</style>
