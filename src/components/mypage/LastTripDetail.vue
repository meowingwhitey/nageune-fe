<script setup>
import { ref } from "vue";
import { localAxios } from "@/util/axios_interceptor";
import { useTokenStore } from "@/stores/tokenStore";

const local = localAxios();
const tokenStore = useTokenStore();
const REST_TRAVELHISTORY_API = `/travelHistory`;

const emit = defineEmits(["closeDialog"]);

defineProps({
  id: Number, //여행 아이디 불러오기
  tripTitle: String,
});

const closeDialog = () => {
  emit("closeDialog");
};

// 여행 아이디로 루트 검색

// 날짜별로 받아온 루트 -> 내부 문화재 디테일 검색

// content + 사진 + 인증할 때 올린 사진
</script>

<template>
  <v-dialog max-width="1200">
    <v-card>
      <v-card-title class="text-center text-h6 font-weight-bold mt-3">
        {{ tripTitle }}
      </v-card-title>
      <v-card-item>
        <!-- 여행 사진 & 정보(content) 출력  -->
        {{ id }}
      </v-card-item>
      <template v-slot:actions>
        <button @click="closeDialog">닫기</button>
      </template>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
