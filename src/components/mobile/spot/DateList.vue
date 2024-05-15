<script setup>
import { ref } from "vue";

//1일차, 2일차 3일차 -> 여행정보 불러오기
const date = ref(10);
</script>

<template>
  <div id="date-box">
    <v-sheet class="mx-auto" max-width="100vw">
      <v-slide-group show-arrows>
        <v-slide-group-item
          v-for="n in date"
          :key="n"
          v-slot="{ isSelected, toggle }"
        >
          <v-btn
            :color="isSelected ? '#388E3C' : undefined"
            class="ma-2"
            rounded
            elevation="1"
            @click="toggle"
          >
            {{ n }}일차
          </v-btn>
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>
  </div>
</template>

<style scoped></style>
