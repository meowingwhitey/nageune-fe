<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <div>게시글 상세보기</div>
  <span>{{ route.params.id }}</span>
  <v-card> </v-card>
</template>

<style scoped></style>
