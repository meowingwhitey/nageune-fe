<script setup>
import { ref } from "vue";
import SpotDialog from "@/components/mobile/spot/SpotDialog.vue";
import VChip from "@/components/mobile/spot/VChip.vue";

const spot = {
  id: 1,
  title: "진흥왕 순수비",
  age: ["신라", "6세기 말"],
  address: "서울 용산구 서빙고로 137, 국립중앙박물관(용산동6가)",
};

const dialog = ref(false);
const closeDialog = () => {
  dialog.value = false;
};
</script>
<template>
  <v-col cols="10">
    <v-card class="d-flex flex-no-wrap position-relative" elevation="1">
      <v-avatar class="ma-3" rounded="0" size="100">
        <v-img
          src="http://www.cha.go.kr/unisearch/images/national_treasure/1611458.jpg"
        ></v-img>
      </v-avatar>
      <div>
        <div>
          <div class="mx-3 mt-3 mb-1 font-weight-bold">
            {{ spot.title }}
          </div>
          <div>
            <VChip v-for="text in spot.age" :text="text" class="ml-2" />
          </div>
        </div>

        <v-card-actions class="position-absolute bottom-0 right-0 mb-1 mr-1">
          <v-btn
            class="ms-2"
            size="small"
            text="위치 인증하기"
            variant="outlined"
            @click="dialog = true"
          ></v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-col>
  <SpotDialog v-model="dialog" @close-dialog="closeDialog" />
</template>

<style scoped></style>
