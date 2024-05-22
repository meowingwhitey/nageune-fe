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
  router.push({ name: "travel-route" });
};

const onCreateTravel = () => {
  travelStore.sendTravelInfo();
  router.push({ name: "travel-summary" });
};
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
        <v-icon icon="mdi-calendar-check-outline" />
        여행 생성 전 마지막으로 확인하세요!
      </v-card-title>
      <div>
        <u>
          * 여행 일자는
          <strong>{{ format(travelStore.startDate, "yyyy-MM-dd") }}</strong>
          ~ <strong>{{ format(travelStore.endDate, "yyyy-MM-dd") }}</strong
          >이에요.
        </u>
      </div>
      <div>
        <u>
          총
          <strong
            >{{ `${travelStore.heritageList.length}` }}개의 문화재<span
              class="text-md-h5"
              >🏯</span
            ></strong
          >와
          <strong
            >{{ `${travelStore.placeList.length}` }}개의 경유지<span
              class="text-md-h5"
              >🚏</span
            ></strong
          >를 방문해요
        </u>
      </div>
      <div style="min-height: 15px"></div>
      <div class="d-flex ga-5 row">
        <SummaryRouteList
          v-for="(route, index) in travelStore.routeList"
          :routeList="route"
          :day="index"
        />
      </div>
      <div style="min-height: 20px"></div>
      <div class="d-flex ga-2 row">
        <v-btn
          @click="onPreviousClick"
          rounded="xl"
          color="#90A4AE"
          append-icon="mdi-arrow-u-left-top"
        >
          변경할래요
        </v-btn>
        <v-btn
          @click="onCreateTravel"
          rounded="xl"
          color="#26A69A"
          append-icon="mdi-check-circle-outline"
        >
          자! 여행 드가자!
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
