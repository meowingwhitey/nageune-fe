<script setup>
import ProfileMain from "@/components/mypage/ProfileMain.vue";
import TabsComponent from "@/components/mypage/TabsComponent.vue";
import { useUserStore } from "@/stores/userStore";
import { onBeforeUpdate, onMounted } from "vue";

const userStore = useUserStore();

onMounted(async () => {
  console.log("마이페이지접속");
  await userStore.getUserInfo();
});

onBeforeUpdate(async () => {
  await userStore.getUserInfo();
});
</script>

<template>
  <v-container>
    <v-row>
      <v-col class="mx-auto" cols="12" lg="12">
        <ProfileMain :userInfo="userStore.userInfo" />
        <TabsComponent />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
