<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useRouter } from "vue-router";
import NextBtn from "@/components/travel/NextBtn.vue";
import PreviousBtn from "@/components/travel/PreviousBtn.vue";
import { useMapStore } from "@/stores/mapStore.js";
import { useTravelStore } from "@/stores/travelStore.js";
import SummaryRouteList from "@/components/travel/summary/SummaryRouteList.vue";
import { addDays, differenceInDays } from "date-fns";

const router = useRouter();
const onPreviousClick = () => {
  router.push({ name: "travel-route" });
};

const onCreateTravel = () => {
  router.push({ name: "travel-summary" });
};
const travelStore = useTravelStore();

const dialog = ref(true);
</script>

<template>
  <v-dialog v-model="dialog" max-width="730px" persistent>
    <v-card class="summary-dialog-card">
      <v-card-title class="text-h6 text-md-h5 text-lg-h4">
        <v-icon icon="mdi-calendar-check-outline" />
        여행 생성 전 마지막으로 확인하세요!
      </v-card-title>
      <div>
        <u>
          * 여행 일자는
          <strong>2024-01-01</strong>
          ~<strong>2024-01-10</strong>이에요.
        </u>
      </div>
      <div>
        <u>
          총 <strong>12개의 문화재<span class="text-md-h5">🏯</span></strong
          >와 <strong>12개의 경유지<span class="text-md-h5">🚏</span></strong
          >를 방문해요
        </u>
      </div>
      <div style="height: 10px"></div>
      <div class="d-flex ga-5 row">
        <SummaryRouteList
          v-for="route in travelStore.routeList"
          :routeList="route"
        />
      </div>
      <div style="height: 20px"></div>
      <div class="d-flex ga-2 row">
        <v-btn
          @click="onPreviousClick"
          rounded="xl"
          color="#90A4AE"
          append-icon="mdi-arrow-u-left-top"
        >
          변경할게 있어요
        </v-btn>
        <v-btn
          @click="onCreateTravel"
          rounded="xl"
          color="#26A69A"
          append-icon="mdi-check-circle-outline"
        >
          자 여행 드가자!
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.summary-dialog-card {
  max-width: 730px;
  padding: 20px;
  display: flex;
  align-items: center;
}
</style>
