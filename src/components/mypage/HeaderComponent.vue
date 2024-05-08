<script setup></script>

<template>
  <v-layout>
    <v-app-bar
      class="position-sticky top-0"
      color="blue-grey-lighten-5"
      :elevation="0"
      :height="80"
    >
      <v-app-bar-title class="ml-5">
        <!-- <img src="/src/assets/logo.png"></img> -->
        title
      </v-app-bar-title>
      <div class="mr-5">
        <v-btn color="blue-grey-darken-1" variant="elevated"> 로그아웃 </v-btn>
        <v-btn color="blue-grey-darken-1" variant="elevated" class="ml-2">
          로그인
        </v-btn>
      </div>
    </v-app-bar>
  </v-layout>
</template>

<style scoped></style>
