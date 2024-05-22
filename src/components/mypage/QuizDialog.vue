<script setup>
import { ref } from "vue";
const emit = defineEmits(["closeDialog"]);

const props = defineProps({
  heritageId: Number,
});

const closeDialog = () => {
  emit("closeDialog");
};
</script>

<template>
  <v-dialog max-width="800">
    <v-card>
      <v-card-title class="text-center text-h6 font-weight-bold mt-3">
        퀴즈 풀기
      </v-card-title>
      <v-card-item>
        <p>문화재 id: {{ heritageId }}</p>
        <p>퀴즈 출력</p>
      </v-card-item>
      <template v-slot:actions>
        <button @click="closeDialog">닫기</button>
      </template>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
