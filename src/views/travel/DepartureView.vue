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
const onPreviousClick = () => {
  router.push({ name: "travel-create" });
};

const onCreateTravel = () => {
  router.push({ name: "travel-schedule" });
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
        <v-icon icon="mdi-home-edit-outline" />
        여행의 시작과 끝을 정해주세요
      </v-card-title>
      <div>
        <u> </u>
      </div>
      <div></div>
      <div style="min-height: 15px"></div>
      <div
        class="d-flex row ga-2 align-center justify-center"
        style="width: 100%"
      >
        <!-- 이름, 출발, 도착지 설정 -->
        <div style="width: 270px">
          <div class="text-h6">출발지</div>
          <v-text-field
            prepend-inner-icon="mdi-airplane-takeoff"
            density="compact"
            variant="outlined"
            placeholder="우리집 포근한 침대 이불 속"
          ></v-text-field>
        </div>
        <div style="width: 15px"></div>
        <div style="width: 270px">
          <div class="text-h6">도착지</div>
          <v-text-field
            prepend-inner-icon="mdi-airplane-landing"
            density="compact"
            variant="outlined"
            placeholder="우리집 침대 위"
          ></v-text-field>
        </div>
      </div>
      <div style="min-height: 20px"></div>
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
          일정을 정하러가요!
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.summary-dialog-card {
  min-width: 730px;
  width: fit-content;
  padding: 30px;
  display: flex;
  align-items: center;
}
</style>
