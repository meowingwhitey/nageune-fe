<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useRouter } from "vue-router";
import { useMapStore } from "@/stores/mapStore.js";
import { useTravelStore } from "@/stores/travelStore.js";
import SummaryRouteList from "@/components/travel/summary/SummaryRouteList.vue";
import { format, addDays, differenceInDays } from "date-fns";
const mapStore = useMapStore();
const travelStore = useTravelStore();

const router = useRouter();

const travelTitle = ref("");
const onPreviousClick = () => {
  router.push({ name: "index" });
};

const onCreateTravel = () => {
  travelStore.travelTitle = travelTitle.value;
  console.log(travelStore.travelTitle);
  router.push({ name: "travel-departure" });
};
console.log(travelStore);
const dialog = ref(true);
</script>

<template>
  <v-dialog
    v-if="mapStore.isKakaoMapLoaded"
    v-model="dialog"
    max-width="fit-content"
    persistent
  >
    <v-card class="summary-dialog-card">
      <v-card-title class="text-h6 text-md-h5 text-lg-h4">
        <v-icon icon="mdi-rename-box-outline" />
        이번에 떠날 여행의 이름을 정해주세요
      </v-card-title>
      <div>
        <u> </u>
      </div>
      <div style="min-height: 5px"></div>
      <div
        class="d-flex column ga-2 align-center justify-center"
        style="width: 100%"
      >
        <div style="width: 350px">
          <div class="text-h6">여행 이름</div>
          <v-text-field
            prepend-inner-icon="mdi-airplane-edit"
            density="compact"
            variant="outlined"
            placeholder="주식해서 번 돈으로 가는 부산여행"
            v-model="travelTitle"
          ></v-text-field>
        </div>
      </div>
      <div style="min-height: 10px"></div>
      <div class="d-flex ga-2 row">
        <v-btn
          @click="onPreviousClick"
          rounded="xl"
          color="#90A4AE"
          append-icon="mdi-arrow-u-left-top"
        >
          그냥 집에 있을래요
        </v-btn>
        <v-btn
          @click="onCreateTravel"
          rounded="xl"
          color="#26A69A"
          append-icon="mdi-arrow-right"
        >
          출발!
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.summary-dialog-card {
  min-width: 530px;
  width: fit-content;
  padding: 30px;
  display: flex;
  align-items: center;
}
</style>
