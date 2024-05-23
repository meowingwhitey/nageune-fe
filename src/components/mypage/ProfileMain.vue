<script setup>
import { watch } from "vue";

const props = defineProps({
  userInfo: Object,
});
</script>

<template>
  <div id="profile" class="bg-white">
    <v-card
      class="d-flex align-center"
      variant="text"
      min-height="180"
      min-width="500px"
      width="100%"
    >
      <div class="d-flex ml-2">
        <img :src="userInfo.img" width="150px" height="150px" />

        <div class="d-flex flex-column justify-end mb-2">
          <v-card-title class="pb-1 profile-main-id">
            {{ userInfo.nickname }}님
          </v-card-title>
          <div class="ml-4">
            <p>🛫 {{ userInfo.createdAt }}부터 여행 중</p>
            <p>✉️ {{ userInfo.email }}</p>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<style scoped>
#profile {
  box-shadow: 0 0 10px rgba(10, 10, 10, 0.3);
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 15px;
}

.profile-main-id {
  font-size: x-large;
}
</style>
