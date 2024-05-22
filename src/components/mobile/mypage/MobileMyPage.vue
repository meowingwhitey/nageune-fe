<script setup>
import MobileRouteList from "@/components/mobile/mypage/MobileRouteList.vue";
import ProfileDetail from "@/components/mypage/ProfileDetail.vue";
import { ref } from "vue";
import { useUserStore } from "@/stores/userStore";
import { usePlanStore } from "@/stores/planStore";
import CardList from "@/components/mypage/CardList.vue";
import { onBeforeUpdate, onMounted } from "vue";

const userStore = useUserStore();
const planStore = usePlanStore();

onMounted(async () => {
  console.log("마이페이지접속");
  await userStore.getUserInfo();
});

// onBeforeUpdate(async () => {
//   await userStore.getUserInfo();
// });

const tab = ref("plans");
const isMobile = ref(true);
</script>

<template>
  <v-card class="d-flex align-end mt-9 mb-6" variant="flat">
    <!-- 프로필 이미지 -->
    <img :src="userStore.userInfo.img" id="profile-image" class="ml-5 mr-2" />
    <div class="ml-2">
      <!-- 닉네임, 이메일, 가입날짜 출력 -->
      <div class="mb-1">
        <span class="font-weight-bold">{{ userStore.userInfo.nickname }}</span
        >님
      </div>
      <div class="profile-text">{{ userStore.userInfo.email }}</div>
      <div class="profile-text mb-1">
        {{ userStore.userInfo.createdAt }}부터 여행 중
      </div>
    </div>
  </v-card>
  <v-divider :thickness="10" color="rgb(220, 220, 220)"></v-divider>

  <v-tabs align-tabs="center" v-model="tab">
    <v-tab value="plans">여행계획</v-tab>
    <v-tab value="cards">여행카드</v-tab>
    <v-tab value="profile">회원정보</v-tab>
  </v-tabs>

  <v-tabs-window v-model="tab">
    <v-tabs-window-item value="plans">
      <MobileRouteList />
    </v-tabs-window-item>
    <v-tabs-window-item value="cards">
      <CardList :isMobile="isMobile" />
    </v-tabs-window-item>
    <v-tabs-window-item value="profile"><ProfileDetail /></v-tabs-window-item>
  </v-tabs-window>
</template>

<style scoped>
#profile-image {
  width: 100px;
  height: 100px;
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
