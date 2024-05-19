<script setup></script>

<template>
  <!-- 카카오맵 로딩 전 -->
  <v-card
    class="search-list overflow-y-auto d-flex justify-center align-center flex-column"
  >
    <v-progress-circular color="primary" indeterminate></v-progress-circular>
  </v-card>
</template>

<style scoped>
.search-list {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  width: 100%;
  height: 100%;
}
</style>
