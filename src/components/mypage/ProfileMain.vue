<script setup>
import { useUserStore } from "@/stores/userStore";
import { ref } from "vue";

const userStore = useUserStore();
</script>

<template>
  <div id="profile">
    <v-card
      class="d-flex align-center"
      variant="text"
      min-height="180"
      min-width="500px"
      width="100%"
    >
      <div class="d-flex ml-2">
        <template v-if="userStore.userInfo.img === null">
          <img src="/src/assets/profile.png" width="150px" height="150px" />
        </template>
        <template v-else>
          <img :src="userStore.userInfo.img" width="150px" height="150px" />
        </template>

        <div class="d-flex flex-column justify-center">
          <v-card-title class="pb-1">
            {{ userStore.userInfo.nickname }}님
          </v-card-title>
          <v-card-text class="pb-0">0000.00.00부터 여행 중</v-card-text>
          <v-card-text class="pt-1 pb-0">
            {{ userStore.userInfo.email }}
          </v-card-text>
          <v-card-item>
            <v-chip class="mr-1">카드</v-chip>
            <v-chip class="mr-1">카드</v-chip>
          </v-card-item>
        </div>
      </div>
    </v-card>
  </div>
</template>

<style scoped>
#profile {
  border: 2px solid rgb(245, 245, 245);
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 15px;
}
</style>
