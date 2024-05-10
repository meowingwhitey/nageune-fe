<script setup></script>

<template>
  <v-card
    id="place-search-list"
    class="overflow-y-auto d-flex justify-center align-center flex-column"
  >
    <v-icon icon="mdi-magnify"></v-icon>
    <div>장소를 검색해주세요!</div>
  </v-card>
</template>

<style scoped>
#place-search-list {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  width: 100%;
  height: 100%;
}
#place-search-list::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
  width: 100%;
}
</style>
