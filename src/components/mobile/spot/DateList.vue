<script setup>
import { ref } from "vue";

//1일차, 2일차 3일차 -> 여행정보 불러오기

defineProps({
  dateCnt: Number,
});

const emit = defineEmits(["changeDate"]);

const changeDate = (n) => {
  //선택된 날짜 전송
  emit("changeDate", n);
};
</script>

<template>
  <div id="date-box">
    <v-sheet class="mx-auto" max-width="95vw">
      <v-slide-group show-arrows>
        <v-slide-group-item
          v-for="n in dateCnt"
          :key="n"
          v-slot="{ isSelected, toggle }"
        >
          <v-btn
            :color="isSelected ? '#388E3C' : undefined"
            class="ma-3"
            rounded
            elevation="1"
            @click="toggle(), changeDate(n)"
          >
            {{ n }}일차
          </v-btn>
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>
  </div>
</template>

<style scoped></style>
