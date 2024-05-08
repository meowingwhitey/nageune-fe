<script setup></script>

<template>
  <div>
    <v-card class="d-flex" variant="text" id="profile" min-height="180">
      <v-card-item>
        <img src="/src/assets/profile.png" />
      </v-card-item>
      <div>
        <v-card-title>이름</v-card-title>
        <v-card-text class="pt-1 pb-0">가입날짜</v-card-text>
        <v-card-text class="pt-1 pb-0">이메일</v-card-text>
        <v-card-item>
          <v-chip class="mr-1">카드</v-chip>
          <v-chip class="mr-1">카드</v-chip>
        </v-card-item>
      </div>
    </v-card>
  </div>
</template>

<style scoped>
#profile {
  min-width: 500px;
  width: 100%;
}
</style>
